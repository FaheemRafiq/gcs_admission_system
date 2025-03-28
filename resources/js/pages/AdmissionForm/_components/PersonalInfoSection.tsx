import React from 'react';
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
import { useAdmissionFormDispatch, useAdmissionFormState } from '@/contexts/AdmissionFormContext';

const PersonalInfoSection: React.FC = () => {
    const { formData: data, errors } = useAdmissionFormState();
    const dispatch = useAdmissionFormDispatch();    

    const setData = (key: string, value: any) => {
        dispatch?.({ type: 'SET_FIELD', payload: { key, value } });
    };

    return (
        < div className="border-t border-border pt-6" >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className={cn("w-8 h-8 rounded-full bg-cyan-foreground text-secondary-foreground flex items-center justify-center mr-2 text-sm", { 'bg-red-100 text-red-600': errors.name || errors.cell || errors.email || errors.address })}>3</span>
                Personal Information
            </h2>
            <p className="text-sm text-gray-600 mb-4">Please fill in your personal information.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                <div className="space-y-1">
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
                <div className="space-y-1">
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
                <div className="space-y-1 md:col-span-2 lg:col-span-3">
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
            {
                (errors.name || errors.cell || errors.email) && (
                    <p className="text-sm text-destructive mt-2">{errors.name || errors.cell || errors.email}</p>
                )
            }
        </div >
    );
};

export default PersonalInfoSection;
