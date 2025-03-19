import React, { useEffect, useMemo, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppearance } from '@/hooks/use-appearance';
import { Loader2 } from 'lucide-react';
import GcsLogoSvg from '@/assets/Logo.svg';
import { cn } from '@/lib/utils';
import BoxSection from './_components/BoxSection';
import { CheckedState } from '@radix-ui/react-checkbox';
import toast, { Toaster } from 'react-hot-toast';

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

interface FormData {
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
    [key: string]: any
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
    const { updateAppearance } = useAppearance();
    const [interSubjects, setInterSubjects] = useState<InterSubject[]>([
        { id: 1, name: 'English', readOnly: true },
        { id: 2, name: 'Urdu', readOnly: true },
        { id: 3, name: 'Islamiat', readOnly: true },
        { id: 4, name: 'Pak. Study', readOnly: true },
        { id: 5, name: '', readOnly: false },
        { id: 6, name: '', readOnly: false },
        { id: 7, name: '', readOnly: false },
    ]);

    const { data, setData, post, processing, transform, errors } = useForm<FormData>({
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

        transform((data) => {
            const formData = new FormData();
        
            // Handle other fields
            Object.entries(data).forEach(([key, value]) => {
              if (key === 'photo' && value) {
                formData.append(key, value);
              } else if (key === 'inter_subjects' || key === 'examination') {
                formData.append(key, JSON.stringify(value));
              } else {
                formData.append(key, value ? value.toString() : '');
              }
            });
        
            return formData;
          });

        post('/admission-form', {
            preserveScroll: true,
            onSuccess: () => {

            },
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
        <>
            <Head title="Admission Form" />
            <div className="container mx-auto p-4">
                <Card className="w-full max-w-7xl mx-auto border-2 border-black">
                    <div className="p-4">
                        {/* Header */}
                        <div className="text-center border-b-2 border-black pb-2 flex items-center justify-center">
                            <div className="mr-2">
                                <img src={GcsLogoSvg} alt="College Logo" className="h-40" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-destructive">
                                    Government Graduate College of Science
                                </h1>
                                <h1 className="text-2xl text-right">
                                    گورنمنٹ گریجوایٹ کالج آف سائنس
                                </h1>
                                <p className='text-left mb-1'>
                                    Wahdat Road, Lahore.
                                    (
                                    <a href="https://sites.google.com/gcslahore.edu.pk/ggcs/home" target="_blank" rel="noopener noreferrer">
                                        www.gcslahore.edu.pk
                                    </a>
                                    )
                                </p>
                                <h2 className="inline text-lg border rounded-2xl border-black p-1.5">
                                    APPLICATION FOR ADMISSION-{new Date().getFullYear()}
                                </h2>
                            </div>
                            <div className="ml-2 border border-black w-36 h-44 flex items-center justify-center relative">
                                {data.photo && (
                                    <img
                                        src={URL.createObjectURL(data.photo)}
                                        alt="Uploaded Photo"
                                        className="absolute w-full h-full object-cover"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setData('photo', e.target.files[0]);
                                        }
                                    }}
                                />
                                {!data.photo && (
                                    <p className="text-xs text-center">
                                        Attach one recent Photograph of size 2" x 1.5" with blue background
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Form Fields */}
                        <form onSubmit={handleSubmit} className="mt-4">

                            {/* Shift */}
                            <BoxSection
                                title='Shift'
                                description='Select your preferred shift.'
                                errorMessage={errors.shift}
                            >
                                <div className="grid grid-cols-2 gap-2">
                                    {shifts.map((shift) => (
                                        <div key={shift} className="border border-black/30 p-1 text-center">
                                            <div className="flex items-center justify-center">
                                                <Checkbox
                                                    id={`shift_${shift}`}
                                                    checked={data.shift === shift}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setData('shift', shift as 'Morning' | 'Evening');
                                                        } else {
                                                            setData('shift', '');
                                                        }
                                                    }}
                                                    className="mr-2"
                                                />
                                                <Label htmlFor={`shift_${shift}`} className="text-sm">
                                                    {shift}
                                                </Label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </BoxSection>

                            <BoxSection
                                title='Program'
                                description='Please select only one program when applying. If you wish to apply for multiple programs, submit a separate form for each.'
                                className="space-y-2"
                                descriptionClassName="text-red-600"
                                errorMessage={errors.program_category || errors.program_value}
                            >
                                {/* Dynamic Programs */}
                                {programGroups.map((group) => (
                                    <div key={group.label}>
                                        <div className="text-center font-bold underline mb-2 uppercase">
                                            {group.label}
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            {group.options.map((degree) => (
                                                <div key={degree} className="border border-black/30 p-1 text-center">
                                                    <div className="flex items-center justify-center">
                                                        <Checkbox
                                                            id={`${group.category}_${degree}`}
                                                            checked={data.program?.category === group.category && data.program?.value === degree}
                                                            onCheckedChange={(checked) => {
                                                                handleProgramChange(group.category, degree, checked);
                                                            }}
                                                            className="mr-2"
                                                        />
                                                        <Label htmlFor={`${group.category}_${degree}`} className="text-sm">
                                                            {degree}
                                                        </Label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                ))}

                            </BoxSection>

                            {/* Personal Information */}
                            <BoxSection
                                title="PERSONAL INFORMATION"
                                description="Please fill in your personal information."
                                className='pb-0'
                            >
                                <div className="border border-black/30 rounded-md mb-4">
                                    <div className="grid grid-cols-3 border-b border-black/30">
                                        <div className="p-2 border-r border-black/30">
                                            <Label htmlFor="name">Name of Candidate</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                        <div className="p-2 col-span-2">
                                            <Label htmlFor="cell">Phone No #</Label>
                                            <Input
                                                id="cell"
                                                value={data.cell}
                                                onChange={(e) => setData('cell', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 border-b border-black/30">
                                        <div className="p-2 border-r border-black/30">
                                            <Label htmlFor="father_name">Father's Name</Label>
                                            <Input
                                                id="father_name"
                                                value={data.father_name}
                                                onChange={(e) => setData('father_name', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                        <div className="p-2 col-span-2">
                                            <Label htmlFor="father_cell">Father's Phone No #</Label>
                                            <Input
                                                id="father_cell"
                                                value={data.father_cell}
                                                onChange={(e) => setData('father_cell', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 border-b border-black/30">
                                        <div className="p-2 border-r border-black/30">
                                            <Label htmlFor="cnic">Candidate's CNIC/Bay Form No.</Label>
                                            <Input
                                                id="cnic"
                                                value={data.cnic}
                                                onChange={(e) => setData('cnic', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                        <div className="p-2 border-r border-black/30">
                                            <Label htmlFor="domicile">Domicile</Label>
                                            <Input
                                                id="domicile"
                                                value={data.domicile}
                                                onChange={(e) => setData('domicile', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <Label htmlFor="religion">Religion</Label>
                                            <Input
                                                id="religion"
                                                value={data.religion}
                                                onChange={(e) => setData('religion', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 border-b border-black/30">
                                        <div className="p-2 border-r border-black/30">
                                            <Label htmlFor="dob">Date of Birth (According to S.S.C)</Label>
                                            <Input
                                                id="dob"
                                                value={data.dob}
                                                onChange={(e) => setData('dob', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                        <div className="p-2 col-span-2">
                                            <Label htmlFor="email">E-mail</Label>
                                            <Input
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 border-b border-black/30">
                                        <div className="p-2 border-r border-black/30">
                                            <Label htmlFor="father_occupation">Father's Occupation</Label>
                                            <Input
                                                id="father_occupation"
                                                value={data.father_occupation}
                                                onChange={(e) => setData('father_occupation', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                        <div className="p-2 col-span-2">
                                            <Label htmlFor="father_cnic">Father's CNIC No.</Label>
                                            <Input
                                                id="father_cnic"
                                                value={data.father_cnic}
                                                onChange={(e) => setData('father_cnic', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 border-b border-black/30">
                                        <div className="p-2 border-r border-black/30">
                                            <Label htmlFor="guardian_name">Guardian's Name</Label>
                                            <Input
                                                id="guardian_name"
                                                value={data.guardian_name}
                                                onChange={(e) => setData('guardian_name', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                        <div className="p-2 border-r border-black/30">
                                            <Label htmlFor="guardian_occupation">Occupation</Label>
                                            <Input
                                                id="guardian_occupation"
                                                value={data.guardian_occupation}
                                                onChange={(e) => setData('guardian_occupation', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <Label htmlFor="guardian_cell">Guardian Phone No #</Label>
                                            <Input
                                                id="guardian_cell"
                                                value={data.guardian_cell}
                                                onChange={(e) => setData('guardian_cell', e.target.value)}
                                                className="border-none focus-visible:border-none focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-2 border-b border-black/30">
                                        <Label htmlFor="present_address">Present Address</Label>
                                        <Input
                                            id="present_address"
                                            value={data.present_address}
                                            onChange={(e) => setData('present_address', e.target.value)}
                                            className="border-none focus-visible:border-none focus-visible:ring-0"
                                        />
                                    </div>

                                    <div className="p-2">
                                        <Label htmlFor="permanent_address">Permanent Home Address</Label>
                                        <Input
                                            id="permanent_address"
                                            value={data.permanent_address}
                                            onChange={(e) => setData('permanent_address', e.target.value)}
                                            className="border-none focus-visible:border-none focus-visible:ring-0"
                                        />
                                    </div>
                                </div>
                            </BoxSection>

                            {/* Subjects */}
                            <BoxSection
                                title="Subjects (For intermediate Classes Only)"
                            >
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {interSubjects.map((subject: InterSubject) => (
                                        <div key={subject.id} className="flex items-center">
                                            <Label className="mr-2 text-nowrap">{subject.id})</Label>
                                            <input
                                                value={subject.name}
                                                onChange={(e) => handleSubjectChange(subject.id, e.target.value)}
                                                className={cn("h-8", {
                                                    "border-b border-black appearance-none focus:outline-0": !subject.readOnly,
                                                    "border-none focus:ring-0": subject.readOnly
                                                })}
                                                placeholder={`Subject ${subject.id}`}
                                                readOnly={subject.readOnly}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </BoxSection>

                            {/* Examination Details */}
                            <BoxSection
                                title="Examination Details"
                                description="Please mention your examination details in the table below."
                            >
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="border border-black/30 p-1" rowSpan={2}>Examination</th>
                                                <th className="border border-black/30 p-1" rowSpan={2}>Year</th>
                                                <th className="border border-black/30 p-1" rowSpan={2}>Roll No.</th>
                                                <th className="border border-black/30 p-1" rowSpan={2}>Marks</th>
                                                <th className="border border-black/30 p-1" rowSpan={2}>%avg</th>
                                                <th className="border border-black/30 p-1" rowSpan={2}>Subjects</th>
                                                <th className="border border-black/30 p-1 text-center" colSpan={2}>From where passed</th>
                                            </tr>
                                            <tr>
                                                <th className="border border-black/30 p-1">Board/University</th>
                                                <th className="border border-black/30 p-1">School/College</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Dynamic Rows */}
                                            {ExaminationLevels.map((level) => {
                                                const levelKey = level.key as keyof typeof data.examination;
                                                const LevelData = data.examination[levelKey] as ExaminationRecord;
                                                return (
                                                    <tr>
                                                        <td className="border border-black/30 p-1 font-semibold">{level.label}</td>
                                                        <td className="border border-black/30 p-1">
                                                            <Input
                                                                value={LevelData.year}
                                                                onChange={(e) => {
                                                                    setData('examination', {
                                                                        ...data.examination,
                                                                        [levelKey]: {
                                                                            ...LevelData,
                                                                            year: e.target.value
                                                                        }
                                                                    });
                                                                }}
                                                                className="border-none h-8 focus-visible:ring-0"
                                                            />
                                                        </td>
                                                        <td className="border border-black/30 p-1">
                                                            <Input
                                                                value={LevelData.roll_no}
                                                                onChange={(e) => {
                                                                    setData('examination', {
                                                                        ...data.examination,
                                                                        [levelKey]: {
                                                                            ...LevelData,
                                                                            roll_no: e.target.value
                                                                        }
                                                                    });
                                                                }}
                                                                className="border-none h-8 focus-visible:ring-0"
                                                            />
                                                        </td>
                                                        <td className="border border-black/30 p-1">
                                                            <Input
                                                                value={LevelData.marks}
                                                                onChange={(e) => {
                                                                    setData('examination', {
                                                                        ...data.examination,
                                                                        [levelKey]: {
                                                                            ...LevelData,
                                                                            marks: e.target.value
                                                                        }
                                                                    });
                                                                }}
                                                                className="border-none h-8 focus-visible:ring-0"
                                                            />
                                                        </td>
                                                        <td className="border border-black/30 p-1">
                                                            <Input
                                                                value={LevelData.percentage}
                                                                onChange={(e) => {
                                                                    setData('examination', {
                                                                        ...data.examination,
                                                                        [levelKey]: {
                                                                            ...LevelData,
                                                                            percentage: e.target.value
                                                                        }
                                                                    });
                                                                }}
                                                                className="border-none h-8 focus-visible:ring-0"
                                                            />
                                                        </td>
                                                        <td className="border border-black/30 p-1">
                                                            <Input
                                                                value={LevelData.subjects}
                                                                onChange={(e) => {
                                                                    setData('examination', {
                                                                        ...data.examination,
                                                                        [levelKey]: {
                                                                            ...LevelData,
                                                                            subjects: e.target.value
                                                                        }
                                                                    });
                                                                }}
                                                                className="border-none h-8 focus-visible:ring-0"
                                                            />
                                                        </td>
                                                        <td className="border border-black/30 p-1">
                                                            <Input
                                                                value={LevelData.board_university}
                                                                onChange={(e) => {
                                                                    setData('examination', {
                                                                        ...data.examination,
                                                                        [levelKey]: {
                                                                            ...LevelData,
                                                                            board_university: e.target.value
                                                                        }
                                                                    });
                                                                }}
                                                                className="border-none h-8 focus-visible:ring-0"
                                                            />
                                                        </td>
                                                        <td className="border border-black/30 p-1">
                                                            <Input
                                                                value={LevelData.school_college}
                                                                onChange={(e) => {
                                                                    setData('examination', {
                                                                        ...data.examination,
                                                                        [levelKey]: {
                                                                            ...LevelData,
                                                                            school_college: e.target.value
                                                                        }
                                                                    });
                                                                }}
                                                                className="border-none h-8 focus-visible:ring-0"
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </BoxSection>

                            {/* Form submit button */}
                            <div className="flex items-center justify-end mt-4">
                                <Button className="ml-4" variant='destructive' disabled={processing}>
                                    {processing && (
                                        <span className="flex items-center">
                                            <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                                        </span>
                                    )}
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>

            <Toaster position='top-center' />
        </>
    );
}

export default AdmissionForm;