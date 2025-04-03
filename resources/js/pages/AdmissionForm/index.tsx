// pages/AdmissionForm.tsx
import DeveloperWatermark from '@/components/developer-watermark';
import { Button } from '@/components/ui/button';
import { useAppForm } from '@/hooks/use-admission-form';
import { useAppearance } from '@/hooks/use-appearance';
import AdmissionFormLayout from '@/layouts/MainLayout';
import { useAdmissionFormStore } from '@/store/AdmissionFormStore';
import { type ProgramGroup, type Shift } from '@/types/database';
import { Head } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import ExaminationDetailSection from './_components/ExaminationDetailSection';
import FormNoteSection from './_components/FormNoteSection';
import HeaderSection from './_components/HeaderSection';
import PersonalInfoSection from './_components/PersonalInfoSection';
import ProgramSection from './_components/ProgramSection';
import RequiredDocumentSection from './_components/RequiredDocumentSection';
import { admissionFormOpts } from './_components/shared-form';

interface AdmissionFormProps {
    programGroups: ProgramGroup[];
    shifts: Shift[];
}

const AdmissionForm = ({ programGroups, shifts }: AdmissionFormProps) => {
    const { updateAppearance } = useAppearance();
    const formRef = useRef<HTMLFormElement>(null);
    const { setShifts, setProgramGroups, processing, submitForm } = useAdmissionFormStore();

    const form = useAppForm({
        ...admissionFormOpts,
        onSubmit: async ({ value }) => {
            await submitForm(value, formRef);
        },
    });

    useEffect(() => {
        updateAppearance('light');
        setProgramGroups(programGroups);
        setShifts(shifts);
    }, [updateAppearance]);

    return (
        <AdmissionFormLayout>
            <div className="flex items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8 print:bg-white print:p-0">
                <Head title="Admission Form" />
                <div className="bg-card text-card-foreground w-full max-w-7xl rounded-lg p-6 shadow-lg sm:p-8 print:p-4 print:shadow-none">
                    <div className="mb-4 flex flex-col items-center justify-center md:flex-row">
                        <HeaderSection />

                        {/* Photo Upload - Spans 4 columns on sm and up */}
                        <div className="col-span-12 flex items-start justify-center sm:col-span-4 sm:row-span-3">
                            <div
                                className={
                                    'relative flex h-40 w-32 shrink-0 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 transition hover:border-blue-500 hover:bg-blue-50 sm:h-44 sm:w-36'
                                }
                            >
                                <form.Field name="photo">
                                    {(field) => (
                                        <>
                                            {field.state.value ? (
                                                <img
                                                    src={URL.createObjectURL(field.state.value)}
                                                    alt="Uploaded Photo"
                                                    className="h-full w-full rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center px-2 text-center text-gray-600">
                                                    <span className="text-2xl">📷</span>
                                                    <p className="text-xs">Click to upload a recent photograph (2" x 1.5") with a blue background</p>
                                                </div>
                                            )}
                                            <input
                                                id="photo"
                                                type="file"
                                                accept="image/jpeg, image/jpg, image/png"
                                                className="absolute h-full w-full cursor-pointer opacity-0"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                                                    if (!validTypes.includes(file.type)) {
                                                        toast.error('Only JPG, JPEG, and PNG formats are allowed.');
                                                        return;
                                                    }

                                                    if (file.size > 2 * 1024 * 1024) {
                                                        toast.error('File size must be less than 2MB.');
                                                        return;
                                                    }

                                                    field.setValue(file);
                                                }}
                                                required
                                            />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                        </div>
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-8"
                        ref={formRef}
                    >
                        {/* Programs Section */}
                        <ProgramSection form={form} />

                        {/* Personal Information Section */}
                        <PersonalInfoSection form={form} />

                        {/* Examination Details Section */}
                        <ExaminationDetailSection form={form} />

                        {/* Document Requirements */}
                        <RequiredDocumentSection form={form} />

                        {/* Submit Button */}
                        <div className="border-border mt-8 border-t pt-6">
                            <div className="flex items-center justify-between print:hidden">
                                <DeveloperWatermark className="sm:self-end" />
                                <Button variant={'destructive'} disabled={processing} type="submit">
                                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                    <span>Submit Form</span>
                                </Button>
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div className="mt-8 print:hidden">
                            <FormNoteSection />
                        </div>
                    </form>
                </div>
            </div>
        </AdmissionFormLayout>
    );
};

export default AdmissionForm;
