import React, { useEffect, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppearance } from '@/hooks/use-appearance';
import GcsLogoSvg from '@/assets/Logo.svg';
import { cn } from '@/lib/utils';
import { CheckedState } from '@radix-ui/react-checkbox';
import toast from 'react-hot-toast';
import AdmissionFormLayout from '@/layouts/MainLayout';
import { AxiosWrapper } from '@/lib/fetchWrapper';
import {
    Loader2,
    User,
    School,
    BookOpen,
    Phone,
    Home,
    Calendar,
    Mail,
    FileText,
    AlertCircle,
    Clock,
    Briefcase,
    Percent,
    MapPin,
    UserPlus,
} from 'lucide-react';
import InputError from '@/components/input-error';

interface InterSubject {
    id: number;
    name: string;
    readOnly: boolean;
}

interface ExaminationRecord {
    name: string;
    year: string;
    roll_no: string;
    marks: string;
    percentage: string;
    subjects: string;
    board_university: string;
    school_college: string;
}

type FormData = {
    shift: string;
    program_category: string;
    program_value: string;
    name: string;
    cell: string;
    father_name: string;
    father_cell: string;
    cnic: string;
    domicile: string;
    religion: string;
    dob: string;
    email: string;
    father_occupation: string;
    father_cnic: string;
    guardian_name: string;
    guardian_occupation: string;
    guardian_cell: string;
    present_address: string;
    permanent_address: string;
    inter_subjects: string[];
    examination: {
        matric: ExaminationRecord;
        intermediate: ExaminationRecord;
        associate: ExaminationRecord;
    };
    photo: File | null;
    [key: string]: any;
}

const ExaminationLevels = [
    { key: 'matric', label: 'Matric (Arts/Science)' },
    { key: 'intermediate', label: 'Intermediate (Arts/Science)' },
    { key: 'associate', label: 'Associate Degree (Arts/Science)' },
];

type ProgramGroup = {
    category: string;
    label: string;
    options: string[];
}

interface AdmissionFormProps {
    programGroups: ProgramGroup[];
    shifts: string[]
}

const AdmissionForm = ({ programGroups, shifts }: AdmissionFormProps) => {
    // Global
    const { updateAppearance } = useAppearance();

    // Local
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const formRef = useRef<HTMLFormElement>(null);
    const [interSubjects, setInterSubjects] = useState<InterSubject[]>([
        { id: 1, name: 'English', readOnly: true },
        { id: 2, name: 'Urdu', readOnly: true },
        { id: 3, name: 'Islamiat', readOnly: true },
        { id: 4, name: 'Pak. Study', readOnly: true },
        { id: 5, name: '', readOnly: false },
        { id: 6, name: '', readOnly: false },
        { id: 7, name: '', readOnly: false },
    ]);

    const { data, setData } = useForm<FormData>({
        shift: '',
        program_category: '',
        program_value: '',
        name: '',
        cell: '',
        father_name: '',
        father_cell: '',
        cnic: '',
        domicile: '',
        religion: '',
        dob: '',
        email: '',
        father_occupation: '',
        father_cnic: '',
        guardian_name: '',
        guardian_occupation: '',
        guardian_cell: '',
        present_address: '',
        permanent_address: '',
        inter_subjects: [],
        examination: {
            matric: {
                name: 'Matric',
                year: '',
                roll_no: '',
                marks: '',
                percentage: '',
                subjects: '',
                board_university: '',
                school_college: '',
            },
            intermediate: {
                name: 'Intermediate',
                year: '',
                roll_no: '',
                marks: '',
                percentage: '',
                subjects: '',
                board_university: '',
                school_college: '',
            },
            associate: {
                name: 'Associate Degree',
                year: '',
                roll_no: '',
                marks: '',
                percentage: '',
                subjects: '',
                board_university: '',
                school_college: '',
            },
        },
        photo: null,
    });

    useEffect(() => {
        updateAppearance('light');
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.photo) {
            toast.error('Please attach one recent Photograph (2" x 1.5") with blue background');
            window.scroll({
                top: 0,
                behavior: 'smooth',
            });
            return;
        }

        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        if (Object.keys(data).length > 0) {
            Object.keys(data).forEach((key) => {
                if (key === 'inter_subjects') {
                    formData.append(key, JSON.stringify(interSubjects.map((subject) => subject.name)));
                } else if (key === 'examination') {
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            });
        }

        AxiosWrapper({
            url: route('admission-form.store'),
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                toast.success(response.data.message);
                if (response.data.redirectUrl) {
                    setTimeout(() => {
                        window.location.href = response.data.redirectUrl;
                    }, 500);
                }
            })
            .catch((error) => {
                if (error.response?.status === 422 && error.response?.data?.errors) {
                    const validationErrors: Record<string, string[]> = error.response.data.errors;
                    setErrors(validationErrors);

                    if (formRef.current) {
                        for (const key of Object.keys(validationErrors)) {
                            const element = formRef.current.querySelector<HTMLInputElement>(`[id="${key}"]`);
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" }); 
                                setTimeout(() => element.focus(), 500);
                                break;
                            }
                        }
                    }
                }

                if (error.response?.data?.message) {
                    toast.error(error.response.data.message);
                }
            })
            .finally(() => {
                setProcessing(false);
            });

    };

    // Handle input change for additional subjects
    const handleSubjectChange = (id: number, value: string) => {
        setInterSubjects((interSubjects) =>
            interSubjects.map((subject) => {
                if (subject.id === id) {
                    return { ...subject, name: value };
                } else {
                    return subject;
                }
            }));
    };

    const handleProgramChange = (category: string, value: string, checked: CheckedState) => {
        if (checked) {
            setData(data => ({
                ...data,
                program_category: category,
                program_value: value
            }))
        } else if (data.program?.category === category && data.program?.value === value) {
            setData(data => ({
                ...data,
                program_category: '',
                program_value: ''
            }));
        }
    };

    return (
        <AdmissionFormLayout>
            <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-8 print:p-0 print:bg-white">
                <Head title="Admission Form" />
                <div className="max-w-7xl w-full bg-card text-card-foreground shadow-lg rounded-lg p-6 sm:p-8 print:shadow-none print:p-4">
                    {/* Header */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col lg:flex-row items-center justify-between w-full mb-4">
                            {/* Logo and College Details */}
                            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-4 lg:mb-0">
                                <img src={GcsLogoSvg} alt="College Logo" className="h-20 sm:h-24 mb-4 sm:mb-0 sm:mr-4" />
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Government Graduate College of Science</h1>
                                    <h2 className="text-lg sm:text-xl text-gray-700">گورنمنٹ گریجوایٹ کالج آف سائنس</h2>
                                    <p className="text-sm text-gray-600">
                                        Wahdat Road, Lahore. (
                                        <a
                                            href="https://sites.google.com/gcslahore.edu.pk/ggcs/home"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            www.gcslahore.edu.pk
                                        </a>
                                        )
                                    </p>
                                    <p className="mt-2 text-sm font-semibold text-gray-800 border rounded-full border-gray-300 px-4 py-1 inline-block">
                                        APPLICATION FOR ADMISSION - {new Date().getFullYear()}
                                    </p>
                                </div>
                            </div>

                            {/* Photo Upload */}
                            <div className={cn("relative w-32 h-40 sm:w-36 sm:h-44 border border-gray-30 rounded-md flex items-center justify-center shrink-0", {
                                'border-destructive text-destructive': errors.photo
                            })}>
                                {data.photo ? (
                                    <img src={URL.createObjectURL(data.photo)} alt="Uploaded Photo" className="w-full h-full object-cover rounded-md" />
                                ) : (
                                    <p className="text-xs text-center px-2">
                                        Attach one recent Photograph (2" x 1.5") with blue background
                                    </p>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => e.target.files && setData('photo', e.target.files[0])}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8" ref={formRef}>
                        {/* Shift */}
                        <div className="border-t border-border pt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className={cn("w-8 h-8 rounded-full bg-cyan-foreground text-secondary-foreground flex items-center justify-center mr-2 text-sm", { 'bg-red-100 text-red-600': errors.shift })}>1</span>
                                Shift Selection
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">Select your preferred shift.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {shifts.map((shift) => (
                                    <Label htmlFor={`shift_${shift}`} key={shift} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`shift_${shift}`}
                                            checked={data.shift === shift}
                                            onCheckedChange={(checked) => setData('shift', checked ? shift as 'Morning' | 'Evening' : '')}
                                        />
                                        <span className="text-sm font-medium flex items-center">
                                            <Clock className="h-4 w-4 mr-1" /> {shift}
                                        </span>
                                    </Label>
                                ))}
                            </div>
                            {errors.shift && <p className="text-sm text-destructive mt-2">{errors.shift}</p>}
                        </div>

                        {/* Program Selection */}
                        <div className="border-t border-border pt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className={cn("w-8 h-8 rounded-full bg-cyan-foreground text-secondary-foreground flex items-center justify-center mr-2 text-sm", { 'bg-red-100 text-red-600': errors.program_category || errors.program_value })}>2</span>
                                Program Selection
                            </h2>
                            <p className="text-sm text-destructive mb-4">
                                Please select only one program. Submit a separate form for each additional program.
                            </p>
                            <div className="space-y-6">
                                {programGroups.map((group) => (
                                    <div key={group.label}>
                                        <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                            <BookOpen className="h-4 w-4 mr-1" /> {group.label}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {group.options.map((degree) => (
                                                <Label htmlFor={`${group.category}_${degree}`} key={degree} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`${group.category}_${degree}`}
                                                        checked={data.program_category === group.category && data.program_value === degree}
                                                        onCheckedChange={(checked) => handleProgramChange(group.category, degree, checked)}
                                                    />
                                                    <span className="text-sm font-medium">{degree}</span>
                                                </Label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {(errors.program_category || errors.program_value) && (
                                <p className="text-sm text-destructive mt-2">{errors.program_category || errors.program_value}</p>
                            )}
                        </div>

                        {/* Personal Information */}
                        <div className="border-t border-border pt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className={cn("w-8 h-8 rounded-full bg-cyan-foreground text-secondary-foreground flex items-center justify-center mr-2 text-sm", { 'bg-red-100 text-red-600': errors.name || errors.cell || errors.email || errors.address })}>3</span>
                                Personal Information
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">Please fill in your personal information.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                                <div className="space-y-1">
                                    <Label htmlFor="name" className="text-sm text-gray-500 flex items-center">
                                        <User className="h-4 w-4 mr-1" /> Name of Candidate
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        isError={errors.name}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="cell" className="text-sm text-gray-500 flex items-center">
                                        <Phone className="h-4 w-4 mr-1" /> Mobile Number
                                    </Label>
                                    <Input
                                        id="cell"
                                        value={data.cell}
                                        onChange={(e) => setData('cell', e.target.value)}
                                        isError={errors.cell}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.cell} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="father_name" className="text-sm text-gray-500 flex items-center">
                                        <User className="h-4 w-4 mr-1" /> Father’s Name
                                    </Label>
                                    <Input
                                        id="father_name"
                                        value={data.father_name}
                                        onChange={(e) => setData('father_name', e.target.value)}
                                        isError={errors.father_name}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.father_name} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="father_cell" className="text-sm text-gray-500 flex items-center">
                                        <Phone className="h-4 w-4 mr-1" /> Father’s Mobile
                                    </Label>
                                    <Input
                                        id="father_cell"
                                        value={data.father_cell}
                                        onChange={(e) => setData('father_cell', e.target.value)}
                                        isError={errors.father_cell}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.father_cell} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="cnic" className="text-sm text-gray-500 flex items-center">
                                        <FileText className="h-4 w-4 mr-1" /> CNIC / Bay Form No.
                                    </Label>
                                    <Input
                                        id="cnic"
                                        type="text"
                                        value={data.cnic}
                                        onChange={(e) => {
                                            let { value } = e.target;
                                            if (value.includes(' ')) {
                                                value = value.replace(' ', '');
                                            }

                                            setData('cnic', value);
                                        }}
                                        isError={errors.cnic}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.cnic} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="domicile" className="text-sm text-gray-500 flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" /> Domicile
                                    </Label>
                                    <Input
                                        id="domicile"
                                        value={data.domicile}
                                        onChange={(e) => setData('domicile', e.target.value)}
                                        isError={errors.domicile}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.domicile} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="religion" className="text-sm text-gray-500 flex items-center">
                                        <BookOpen className="h-4 w-4 mr-1" /> Religion
                                    </Label>
                                    <Input
                                        id="religion"
                                        value={data.religion}
                                        onChange={(e) => setData('religion', e.target.value)}
                                        isError={errors.religion}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.religion} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="dob" className="text-sm text-gray-500 flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" /> Date of Birth
                                    </Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        max={new Date().toISOString().split('T')[0]}
                                        value={data.dob}
                                        onChange={(e) => setData('dob', e.target.value)}
                                        isError={errors.dob}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.dob} className="mt-1" />
                                </div>
                                <div className="space-y-1 md:col-span-2 lg:col-span-3">
                                    <Label htmlFor="email" className="text-sm text-gray-500 flex items-center">
                                        <Mail className="h-4 w-4 mr-1" /> Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        isError={errors.email}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="father_occupation" className="text-sm text-gray-500 flex items-center">
                                        <Briefcase className="h-4 w-4 mr-1" /> Father’s Occupation
                                    </Label>
                                    <Input
                                        id="father_occupation"
                                        value={data.father_occupation}
                                        onChange={(e) => setData('father_occupation', e.target.value)}
                                        isError={errors.father_occupation}
                                        className="h-10"
                                    />
                                    <InputError message={errors.father_occupation} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="father_cnic" className="text-sm text-gray-500 flex items-center">
                                        <FileText className="h-4 w-4 mr-1" /> Father’s CNIC
                                    </Label>
                                    <Input
                                        id="father_cnic"
                                        value={data.father_cnic}
                                        onChange={(e) => {
                                            let { value } = e.target;
                                            if (value.includes(' ')) {
                                                value = value.replace(' ', '');
                                            }

                                            setData('father_cnic', value);
                                        }}
                                        isError={errors.father_cnic}
                                        className="h-10"
                                    />
                                    <InputError message={errors.father_cnic} className="mt-1" />
                                </div>
                                <div className="space-y-1 md:col-span-2 lg:col-span-3 border-t border-gray-100 pt-4 mt-2">
                                    <p className="text-sm font-medium text-gray-700 flex items-center">
                                        <UserPlus className="h-4 w-4 mr-1" /> Guardian Information (Optional)
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="guardian_name" className="text-sm text-gray-500 flex items-center">
                                        <User className="h-4 w-4 mr-1" /> Guardian Name
                                    </Label>
                                    <Input
                                        id="guardian_name"
                                        value={data.guardian_name}
                                        onChange={(e) => setData('guardian_name', e.target.value)}
                                        isError={errors.guardian_name}
                                        className="h-10"
                                    />
                                    <InputError message={errors.guardian_name} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="guardian_occupation" className="text-sm text-gray-500 flex items-center">
                                        <Briefcase className="h-4 w-4 mr-1" /> Guardian Occupation
                                    </Label>
                                    <Input
                                        id="guardian_occupation"
                                        value={data.guardian_occupation}
                                        onChange={(e) => setData('guardian_occupation', e.target.value)}
                                        isError={errors.guardian_occupation}
                                        className="h-10"
                                    />
                                    <InputError message={errors.guardian_occupation} className="mt-1" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="guardian_cell" className="text-sm text-gray-500 flex items-center">
                                        <Phone className="h-4 w-4 mr-1" /> Guardian Mobile
                                    </Label>
                                    <Input
                                        id="guardian_cell"
                                        value={data.guardian_cell}
                                        onChange={(e) => setData('guardian_cell', e.target.value)}
                                        isError={errors.guardian_cell}
                                        className="h-10"
                                    />
                                    <InputError message={errors.guardian_cell} className="mt-1" />
                                </div>
                                <div className="space-y-1 md:col-span-2 lg:col-span-3">
                                    <Label htmlFor="present_address" className="text-sm text-gray-500 flex items-center">
                                        <Home className="h-4 w-4 mr-1" /> Present Address
                                    </Label>
                                    <Input
                                        id="present_address"
                                        value={data.present_address}
                                        onChange={(e) => setData('present_address', e.target.value)}
                                        isError={errors.present_address}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.present_address} className="mt-1" />
                                </div>
                                <div className="space-y-1 md:col-span-2 lg:col-span-3">
                                    <Label htmlFor="permanent_address" className="text-sm text-gray-500 flex items-center">
                                        <Home className="h-4 w-4 mr-1" /> Permanent Address
                                    </Label>
                                    <Input
                                        id="permanent_address"
                                        value={data.permanent_address}
                                        onChange={(e) => setData('permanent_address', e.target.value)}
                                        isError={errors.permanent_address}
                                        className="h-10"
                                        required
                                    />
                                    <InputError message={errors.permanent_address} className="mt-1" />
                                </div>
                            </div>
                            {(errors.name || errors.cell || errors.email) && (
                                <p className="text-sm text-destructive mt-2">{errors.name || errors.cell || errors.email}</p>
                            )}
                        </div>

                        {/* Subjects */}
                        <div className="border-t border-border pt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-cyan-foreground text-secondary-foreground flex items-center justify-center mr-2 text-sm">4</span>
                                Subjects (For Intermediate Classes Only)
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">Enter subjects if applying for an intermediate program.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {interSubjects.map((subject: InterSubject) => (
                                    <div key={subject.id} className="flex items-center space-x-2">
                                        <Label className="text-sm text-gray-500 flex items-center text-nowrap">
                                            <BookOpen className="h-4 w-4 mr-1" /> Subject {subject.id}
                                        </Label>
                                        <Input
                                            value={subject.name}
                                            onChange={(e) => handleSubjectChange(subject.id, e.target.value)}
                                            className={cn('h-10', {
                                                'border-b border-border appearance-none focus:outline-0': !subject.readOnly,
                                                'border-none focus:ring-0': subject.readOnly,
                                            })}
                                            placeholder={`Subject ${subject.id}`}
                                            readOnly={subject.readOnly}
                                        />
                                    </div>
                                ))}
                            </div>
                            {errors.inter_subjects && <p className="text-sm text-destructive mt-2">{errors.inter_subjects}</p>}
                        </div>

                        {/* Examination Details */}
                        <div className="border-t border-border pt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-cyan-foreground flex items-center justify-center mr-2 text-sm">5</span>
                                Examination Details
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">Provide your examination details below.</p>
                            <div className="space-y-6">
                                {ExaminationLevels.map((level) => {
                                    const levelKey = level.key as keyof typeof data.examination;
                                    const LevelData = data.examination[levelKey] as ExaminationRecord;
                                    return (
                                        <div key={levelKey} className="bg-gray-50 border border-gray-200 rounded-md p-4">
                                            <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                                                <School className="h-4 w-4 mr-1" /> {level.label}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                                                <div className="space-y-1">
                                                    <Label htmlFor={`${levelKey}_year`} className="text-sm text-gray-500 flex items-center">
                                                        <Calendar className="h-4 w-4 mr-1" /> Year
                                                    </Label>
                                                    <Input
                                                        id={`${levelKey}_year`}
                                                        min={2000}
                                                        max={new Date().getFullYear()}
                                                        type="number"
                                                        value={LevelData.year}
                                                        onChange={(e) =>
                                                            setData('examination', {
                                                                ...data.examination,
                                                                [levelKey]: { ...LevelData, year: e.target.value },
                                                            })
                                                        }
                                                        className="h-10"
                                                        hideCaret
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor={`${levelKey}_roll_no`} className="text-sm text-secondary-foreground/50 flex items-center">
                                                        <FileText className="h-4 w-4 mr-1" /> Roll No.
                                                    </Label>
                                                    <Input
                                                        id={`${levelKey}_roll_no`}
                                                        name={`${levelKey}_roll_no`}
                                                        value={LevelData.roll_no}
                                                        type='number'
                                                        onChange={(e) =>
                                                            setData('examination', {
                                                                ...data.examination,
                                                                [levelKey]: { ...LevelData, roll_no: e.target.value },
                                                            })
                                                        }
                                                        className="h-10"
                                                        hideCaret
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor={`${levelKey}_marks`} className="text-sm text-secondary-foreground/50 flex items-center">
                                                        <BookOpen className="h-4 w-4 mr-1" /> Marks
                                                    </Label>
                                                    <Input
                                                        id={`${levelKey}_marks`}
                                                        min={100}
                                                        max={5000}
                                                        type="number"
                                                        value={LevelData.marks}
                                                        onChange={(e) =>
                                                            setData('examination', {
                                                                ...data.examination,
                                                                [levelKey]: { ...LevelData, marks: e.target.value },
                                                            })
                                                        }
                                                        className="h-10"
                                                        hideCaret
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor={`${levelKey}_percentage`} className="text-sm text-secondary-foreground/50 flex items-center">
                                                        <Percent className="h-4 w-4 mr-1" /> Percentage
                                                    </Label>
                                                    <Input
                                                        id={`${levelKey}_percentage`}
                                                        min={1}
                                                        max={100}
                                                        step="0.1"
                                                        type="number"
                                                        value={LevelData.percentage}
                                                        onChange={(e) =>
                                                            setData('examination', {
                                                                ...data.examination,
                                                                [levelKey]: { ...LevelData, percentage: e.target.value },
                                                            })
                                                        }
                                                        className="h-10"
                                                        hideCaret
                                                    />
                                                </div>
                                                <div className="space-y-1 md:col-span-2">
                                                    <Label htmlFor={`${levelKey}_subjects`} className="text-sm text-secondary-foreground/50 flex items-center">
                                                        <BookOpen className="h-4 w-4 mr-1" /> Subjects
                                                    </Label>
                                                    <Input
                                                        id={`${levelKey}_subjects`}
                                                        value={LevelData.subjects}
                                                        onChange={(e) =>
                                                            setData('examination', {
                                                                ...data.examination,
                                                                [levelKey]: { ...LevelData, subjects: e.target.value },
                                                            })
                                                        }
                                                        className="h-10"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor={`${levelKey}_board_university`} className="text-sm text-secondary-foreground/50 flex items-center">
                                                        <School className="h-4 w-4 mr-1" /> Board/University
                                                    </Label>
                                                    <Input
                                                        id={`${levelKey}_board_university`}
                                                        value={LevelData.board_university}
                                                        onChange={(e) =>
                                                            setData('examination', {
                                                                ...data.examination,
                                                                [levelKey]: { ...LevelData, board_university: e.target.value },
                                                            })
                                                        }
                                                        className="h-10"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor={`${levelKey}_school_college`} className="text-sm text-secondary-foreground/50 flex items-center">
                                                        <School className="h-4 w-4 mr-1" /> School/College
                                                    </Label>
                                                    <Input
                                                        id={`${levelKey}_school_college`}
                                                        value={LevelData.school_college}
                                                        onChange={(e) =>
                                                            setData('examination', {
                                                                ...data.examination,
                                                                [levelKey]: { ...LevelData, school_college: e.target.value },
                                                            })
                                                        }
                                                        className="h-10"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Notes and Submit */}
                        <div className="mt-8 border-t border-border pt-6">
                            <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-md">
                                <h3 className="text-lg font-semibold text-destructive/80 flex items-center">
                                    <AlertCircle className="h-5 w-5 mr-2" /> Important Notes:
                                </h3>
                                <ul className="list-disc list-inside text-destructive/90 text-sm">
                                    <li>
                                        Once submitted, this form <strong>cannot be changed</strong>. Please review all details carefully.
                                    </li>
                                    <li>Ensure all information, including examination details and program selection, is accurate.</li>
                                    <li>Multiple submissions with the same CNIC, shift, and program combination are not allowed.</li>
                                    <li>
                                        Contact support at{' '}
                                        <a href="mailto:support@example.com" className="underline">
                                            support@example.com
                                        </a>{' '}
                                        if you need assistance.
                                    </li>
                                </ul>
                            </div>
                            <div className="flex justify-end print:hidden">
                                <Button
                                    variant={'destructive'}
                                    disabled={processing}
                                    className="flex items-center gap-2 px-6 py-2"
                                >
                                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Submit Form
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdmissionFormLayout>
    );
}

export default AdmissionForm;