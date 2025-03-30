import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
    User,
    BookOpen,
    Phone,
    Home,
    Calendar,
    Mail,
    Briefcase,
    UserPlus,
} from 'lucide-react';
import InputError from '@/components/input-error';
import { CNICInput } from '@/components/cnic-input';
import { EmailInput } from '@/components/email-input';
import { PhoneNumberInput } from '@/components/phone-number';
import { PakistanCitySelect } from '@/components/select-cities-field';
import { useAdmissionFormStore } from '@/store/AdmissionFormStore';
import toast from 'react-hot-toast';

const PersonalInfoSection: React.FC<{ onValidityChange: (isValid: boolean) => void }> = ({ onValidityChange }) => {
    const { formData, errors, setBulkFields, setErrors} = useAdmissionFormStore();
    const [data, setStateData] = useState({
        name: formData.name,
        photo: formData.photo,
        cell: formData.cell,
        cnic: formData.cnic,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        domicile: formData.domicile,
        religion: formData.religion,
        dob: formData.dob,
        father_name: formData.father_name,
        father_cell: formData.father_cell,
        father_occupation: formData.father_occupation,
        father_cnic: formData.father_cnic,
        guardian_name: formData.guardian_name,
        guardian_cell: formData.guardian_cell,
        guardian_occupation: formData.guardian_occupation,
        present_address: formData.present_address,
        permanent_address: formData.permanent_address,
    });

    const setData = (key: string, value: any) => {
        setStateData((prev) => ({ ...prev, [key]: value }));
        // setBulkFields({ [key]: value });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
            <div className="space-y-1 col-span-1 sm:col-span-2">
                <Label htmlFor="name" className="text-sm text-gray-500 flex items-center" required>
                    <User className="h-4 w-4 mr-1" /> Name of Candidate
                </Label>
                <Input
                    id="name"
                    placeholder='i.e. Ibrahim Ali'
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    isError={errors.name}
                    className="h-10"
                    required
                />
                <InputError message={errors.name} className="mt-1" />
            </div>
            {/* Photo Upload */}
            <div className='space-y-1 col-span-1 row-span-3 flex justify-center items-center'>
                <div
                    className={cn(
                        "relative w-32 h-40 sm:w-36 sm:h-44 border border-gray-300 rounded-md flex flex-col items-center justify-center shrink-0 cursor-pointer transition hover:border-blue-500 hover:bg-blue-50",
                        { 'border-destructive text-destructive': errors.photo }
                    )}
                >
                    {data.photo ? (
                        <img
                            src={URL.createObjectURL(data.photo)}
                            alt="Uploaded Photo"
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <div className="text-center text-gray-600 px-2 flex flex-col items-center">
                            <span className="text-2xl">📷</span>
                            <p className="text-xs">Click to upload a recent photograph (2" x 1.5") with a blue background</p>
                        </div>
                    )}
                    <input
                        id="photo-upload"
                        type="file"
                        accept="image/jpeg, image/jpg, image/png"
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const validTypes = ["image/jpeg", "image/jpg", "image/png"];
                            if (!validTypes.includes(file.type)) {
                                toast.error("Only JPG, JPEG, and PNG formats are allowed.");
                                return;
                            }

                            if (file.size > 2 * 1024 * 1024) {
                                toast.error("File size must be less than 2MB.");
                                return;
                            }

                            setData('photo', file);
                        }}
                        required
                    />
                </div>
            </div>
            <div className="space-y-1 col-span-1 sm:col-span-2">
                <Label htmlFor="cell" className="text-sm text-gray-500 flex items-center" required>
                    <Phone className="h-4 w-4 mr-1" /> Mobile Number
                </Label>
                <PhoneNumberInput
                    id="cell"
                    value={data.cell}
                    setValue={(value) => setData('cell', value)}
                    className={cn("h-10 [&>input]:h-10", {
                        'border-destructive': errors.cell
                    })}
                />
                <InputError message={errors.cell} className="mt-1" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="father_name" className="text-sm text-gray-500 flex items-center" required>
                    <User className="h-4 w-4 mr-1" /> Father’s Name
                </Label>
                <Input
                    id="father_name"
                    placeholder='i.e. Muhammad Ali'
                    value={data.father_name}
                    onChange={(e) => setData('father_name', e.target.value)}
                    isError={errors.father_name}
                    className="h-10"
                    required
                />
                <InputError message={errors.father_name} className="mt-1" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="father_cell" className="text-sm text-gray-500 flex items-center" required>
                    <Phone className="h-4 w-4 mr-1" /> Father’s Mobile
                </Label>
                <PhoneNumberInput
                    id="father_cell"
                    value={data.father_cell}
                    setValue={(value) => setData('father_cell', value)}
                    className={cn("h-10 [&>input]:h-10", {
                        "border-destructive": errors.father_cell
                    })}
                />
                <InputError message={errors.father_cell} className="mt-1" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="cnic" className="text-sm text-gray-500 flex items-center" required>
                    CNIC / Bay Form No.
                </Label>
                <CNICInput
                    inputId='cnic'
                    value={data.cnic}
                    onChange={value => setData('cnic', value)}
                    isError={errors.cnic}
                    className="h-10"
                />
                <InputError message={errors.cnic} className="mt-1" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="domicile" className="text-sm text-gray-500 flex items-center" required>
                    Domicile
                </Label>
                <PakistanCitySelect
                    selectId="domicile"
                    placeholder='i.e. Karachi'
                    value={data.domicile}
                    onChange={(value) => setData('domicile', value)}
                    isError={errors.domicile}
                    className="h-10"
                />
                <InputError message={errors.domicile} className="mt-1" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="religion" className="text-sm text-gray-500 flex items-center" required>
                    <BookOpen className="h-4 w-4 mr-1" /> Religion
                </Label>
                <Input
                    id="religion"
                    placeholder='i.e. Islam'
                    value={data.religion}
                    onChange={(e) => setData('religion', e.target.value)}
                    isError={errors.religion}
                    className="h-10"
                    required
                />
                <InputError message={errors.religion} className="mt-1" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="dob" className="text-sm text-gray-500 flex items-center" required>
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
            <div className="space-y-1 md:col-span-2">
                <Label htmlFor="email" className="text-sm text-gray-500 flex items-center" required>
                    <Mail className="h-4 w-4 mr-1" /> Email Address
                </Label>
                <EmailInput
                    id="email"
                    type="email"
                    placeholder='i.e. ibrahim@gmail.com'
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    isError={errors.email}
                    className="h-10"
                    required
                />
                <InputError message={errors.email} className="mt-1" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="father_occupation" className="text-sm text-gray-500 flex items-center" required>
                    <Briefcase className="h-4 w-4 mr-1" /> Father’s Occupation
                </Label>
                <Input
                    id="father_occupation"
                    placeholder='i.e. Business'
                    value={data.father_occupation}
                    onChange={(e) => setData('father_occupation', e.target.value)}
                    isError={errors.father_occupation}
                    className="h-10"
                />
                <InputError message={errors.father_occupation} className="mt-1" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="father_cnic" className="text-sm text-gray-500 flex items-center" required>
                    Father’s CNIC
                </Label>
                <CNICInput
                    inputId='father_cnic'
                    value={data.father_cnic}
                    onChange={value => setData('father_cnic', value)}
                    isError={errors.father_cnic}
                    className="h-10"
                />
                <InputError message={errors.father_cnic} className="mt-1" />
            </div>
            <div className="space-y-1 md:col-span-2 lg:col-span-3 border-t border-border pt-4 mt-2">
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
                    placeholder='i.e. Ibrahim'
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
                    placeholder='i.e. Business'
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
                <PhoneNumberInput
                    id="guardian_cell"
                    value={data.guardian_cell}
                    setValue={(value) => setData('guardian_cell', value)}
                    className={cn("h-10 [&>input]:h-10", errors.guardian_cell && "border-red-500")}
                />
                <InputError message={errors.guardian_cell} className="mt-1" />
            </div>
            <div className="space-y-1 md:col-span-2 lg:col-span-3">
                <Label htmlFor="present_address" className="text-sm text-gray-500 flex items-center" required>
                    <Home className="h-4 w-4 mr-1" /> Present Address
                </Label>
                <Input
                    id="present_address"
                    placeholder='i.e. House # 56, Street # 10, Block C, Gulberg III, Lahore, Pakistan'
                    value={data.present_address}
                    onChange={(e) => setData('present_address', e.target.value)}
                    isError={errors.present_address}
                    className="h-10"
                    required
                />
                <InputError message={errors.present_address} className="mt-1" />
            </div>
            <div className="space-y-1 md:col-span-2 lg:col-span-3">
                <Label htmlFor="permanent_address" className="text-sm text-gray-500 flex items-center" required>
                    <Home className="h-4 w-4 mr-1" /> Permanent Address
                </Label>
                <Input
                    id="permanent_address"
                    placeholder='i.e. House # 56, Street # 10, Block C, Gulberg III, Lahore, Pakistan'
                    value={data.permanent_address}
                    onChange={(e) => setData('permanent_address', e.target.value)}
                    isError={errors.permanent_address}
                    className="h-10"
                    required
                />
                <InputError message={errors.permanent_address} className="mt-1" />
            </div>
        </div>
    );
};

export default PersonalInfoSection;
