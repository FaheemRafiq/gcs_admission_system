import { CNICInput } from '@/components/cnic-input';
import { EmailInput } from '@/components/email-input';
import InputError from '@/components/input-error';
import { PhoneNumberInput } from '@/components/phone-number';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { withForm } from '@/hooks/use-admission-form';
import { cn } from '@/lib/utils';
import { BookOpen, Briefcase, Calendar, Home, Mail, Phone, User, UserPlus } from 'lucide-react';
import { admissionFormOpts } from './shared-form';

const PersonalInfoSection = withForm({
    ...admissionFormOpts,
    render: ({ form }) => {
        return (
            <div className="border-border border-t pt-6">
                <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
                    <span
                        className={cn(
                            'bg-cyan-foreground text-secondary-foreground mr-2 flex h-8 w-8 items-center justify-center rounded-full text-sm',
                        )}
                    >
                        2
                    </span>
                    Personal Information
                </h2>
                <p className="mb-4 text-sm text-gray-600">Provide your personal details and contact information</p>
                <div className="grid grid-cols-12 gap-4">
                    {/* First row - Name and Photo */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="name" className="flex items-center text-sm text-gray-500" required>
                                <User className="mr-1 h-4 w-4" /> Name of Candidate
                            </Label>
                            <form.Field name="name">
                                {(field) => (
                                    <>
                                        <Input
                                            id="name"
                                            placeholder="i.e. Ibrahim Ali"
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10', { 'border-destructive': field.state.meta.errors.length })}
                                            required
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="cell" className="flex items-center text-sm text-gray-500" required>
                                <Phone className="mr-1 h-4 w-4" /> Mobile Number
                            </Label>
                            <form.Field name="cell">
                                {(field) => (
                                    <PhoneNumberInput
                                        id="cell"
                                        value={field.state.value as string}
                                        setValue={(value) => field.setValue(value)}
                                        className={cn('h-10 [&>input]:h-10', { 'border-destructive': field.state.meta.errors.length })}
                                    />
                                )}
                            </form.Field>
                            <InputError message={form.state.fieldMeta?.cell?.errors?.[0]} className="mt-1" />
                        </div>
                    </div>

                    {/* Father's Name */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="father_name" className="flex items-center text-sm text-gray-500" required>
                                <User className="mr-1 h-4 w-4" /> Father's Name
                            </Label>
                            <form.Field name="father_name">
                                {(field) => (
                                    <>
                                        <Input
                                            id="father_name"
                                            placeholder="i.e. Muhammad Ali"
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10')}
                                            required
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Father's Mobile */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="father_cell" className="flex items-center text-sm text-gray-500" required>
                                <Phone className="mr-1 h-4 w-4" /> Father's Mobile
                            </Label>
                            <form.Field name="father_cell">
                                {(field) => (
                                    <>
                                        <PhoneNumberInput
                                            id="father_cell"
                                            value={field.state.value as string}
                                            setValue={(value) => field.setValue(value)}
                                            className={cn('h-10 [&>input]:h-10', { 'border-destructive': field.state.meta.errors.length })}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* CNIC */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="cnic" className="flex items-center text-sm text-gray-500" required>
                                CNIC / Bay Form No.
                            </Label>
                            <form.Field name="cnic">
                                {(field) => (
                                    <>
                                        <CNICInput
                                            inputId="cnic"
                                            value={field.state.value as string}
                                            onChange={(value) => field.setValue(value)}
                                            className={cn('h-10')}
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Domicile */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="domicile" className="flex items-center text-sm text-gray-500" required>
                                Domicile
                            </Label>
                            <form.Field name="domicile">
                                {(field) => (
                                    <>
                                        <Input
                                            id="domicile"
                                            placeholder="i.e. Lahore"
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10')}
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Religion */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="religion" className="flex items-center text-sm text-gray-500" required>
                                <BookOpen className="mr-1 h-4 w-4" /> Religion
                            </Label>
                            <form.Field name="religion">
                                {(field) => (
                                    <>
                                        <Input
                                            id="religion"
                                            placeholder="i.e. Islam"
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10')}
                                            required
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="dob" className="flex items-center text-sm text-gray-500" required>
                                <Calendar className="mr-1 h-4 w-4" /> Date of Birth
                            </Label>
                            {/* Make sure must be 15 years older */}
                            <form.Field
                                name="dob"
                                validators={{
                                    onChange: ({ value }) => {
                                        const today = new Date();
                                        const dob = new Date(value);
                                        const age = today.getFullYear() - dob.getFullYear();
                                        if (age < 15) {
                                            return 'Applicant must be at least 15 years old to apply for admission.';
                                        }
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Input
                                            id="dob"
                                            type="date"
                                            max={new Date(Date.now() - 15 * 31556952000).toISOString().split('T')[0]}
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10')}
                                            required
                                            isError={form.state.fieldMeta?.dob?.errors?.[0]}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Email Address */}
                    <div className="col-span-12 sm:col-span-8 md:col-span-8">
                        <div className="space-y-1">
                            <Label htmlFor="email" className="flex items-center text-sm text-gray-500" required>
                                <Mail className="mr-1 h-4 w-4" /> Email Address
                            </Label>
                            <form.Field name="email">
                                {(field) => (
                                    <>
                                        <EmailInput
                                            id="email"
                                            type="email"
                                            placeholder="i.e. ibrahim@gmail.com"
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10')}
                                            required
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Father's Occupation */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="father_occupation" className="flex items-center text-sm text-gray-500" required>
                                <Briefcase className="mr-1 h-4 w-4" /> Father's Occupation
                            </Label>
                            <form.Field name="father_occupation">
                                {(field) => (
                                    <>
                                        <Input
                                            id="father_occupation"
                                            placeholder="i.e. Business"
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10')}
                                            required
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Father's CNIC */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="father_cnic" className="flex items-center text-sm text-gray-500" required>
                                Father's CNIC
                            </Label>
                            <form.Field name="father_cnic">
                                {(field) => (
                                    <>
                                        <CNICInput
                                            inputId="father_cnic"
                                            value={field.state.value as string}
                                            onChange={(value) => field.setValue(value)}
                                            className={cn('h-10')}
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Guardian Information Header */}
                    <div className="border-border col-span-12 mt-2 border-t pt-4">
                        <p className="flex items-center text-sm font-medium text-gray-700">
                            <UserPlus className="mr-1 h-4 w-4" /> Guardian Information (Optional)
                        </p>
                    </div>

                    {/* Guardian Name */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="guardian_name" className="flex items-center text-sm text-gray-500">
                                <User className="mr-1 h-4 w-4" /> Guardian Name
                            </Label>
                            <form.Field name="guardian_name">
                                {(field) => (
                                    <>
                                        <Input
                                            id="guardian_name"
                                            placeholder="i.e. Ibrahim"
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10')}
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Guardian Occupation */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="guardian_occupation" className="flex items-center text-sm text-gray-500">
                                <Briefcase className="mr-1 h-4 w-4" /> Guardian Occupation
                            </Label>
                            <form.Field name="guardian_occupation">
                                {(field) => (
                                    <>
                                        <Input
                                            id="guardian_occupation"
                                            placeholder="i.e. Business"
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10')}
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Guardian Mobile */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="space-y-1">
                            <Label htmlFor="guardian_cell" className="flex items-center text-sm text-gray-500">
                                <Phone className="mr-1 h-4 w-4" /> Guardian Mobile
                            </Label>
                            <form.Field name="guardian_cell">
                                {(field) => (
                                    <>
                                        <PhoneNumberInput
                                            id="guardian_cell"
                                            value={field.state.value as string}
                                            setValue={(value) => field.setValue(value)}
                                            className={cn('h-10 [&>input]:h-10', { 'border-destructive': field.state.meta.errors.length })}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Present Address */}
                    <div className="col-span-12">
                        <div className="space-y-1">
                            <Label htmlFor="present_address" className="flex items-center text-sm text-gray-500" required>
                                <Home className="mr-1 h-4 w-4" /> Present Address
                            </Label>
                            <form.Field name="present_address">
                                {(field) => (
                                    <>
                                        <Input
                                            id="present_address"
                                            placeholder="i.e. House # 56, Street # 10, Block C, Gulberg III, Lahore, Pakistan"
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10')}
                                            required
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* Permanent Address */}
                    <div className="col-span-12">
                        <div className="space-y-1">
                            <Label htmlFor="permanent_address" className="flex items-center text-sm text-gray-500" required>
                                <Home className="mr-1 h-4 w-4" /> Permanent Address
                            </Label>
                            <form.Field name="permanent_address">
                                {(field) => (
                                    <>
                                        <Input
                                            id="permanent_address"
                                            placeholder="i.e. House # 56, Street # 10, Block C, Gulberg III, Lahore, Pakistan"
                                            value={field.state.value as string}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className={cn('h-10')}
                                            required
                                            isError={Boolean(field.state.meta.errors.length)}
                                        />
                                        <InputError message={field.state.meta.errors?.[0]} className="mt-1" />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

export default PersonalInfoSection;
