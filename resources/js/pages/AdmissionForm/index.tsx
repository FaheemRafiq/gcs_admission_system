import React, { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import AdmissionFormLayout from '@/layouts/MainLayout';
import { Loader2 } from 'lucide-react';
// import { useAdmissionForm } from '@/contexts/AdmissionFormContext';
import HeaderSection from './_components/HeaderSection';
import PersonalInfoSection from './_components/PersonalInfoSection';
import FormNoteSection from './_components/FormNoteSection';
import ExaminationDetailSection from './_components/ExaminationDetailSection';
import ShiftSection from './_components/ShiftSection';
import ProgramSection from './_components/ProgramSection';
import InterSubjectSection from './_components/InterSubjectSection';

export type ProgramGroup = {
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
    // const { submitForm } = useAdmissionForm();
    const { updateAppearance } = useAppearance();

    // Local
    const formRef = useRef<HTMLFormElement>(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        updateAppearance('light');
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // submitForm()
        //     .then((response) => console.log("Ok", response))
        //     .catch((error) => {
        //         if (error.response?.status === 422 && error.response?.data?.errors) {
        //             if (formRef.current) {
        //                 for (const key of Object.keys(error.response?.data?.errors)) {
        //                     const element = formRef.current.querySelector<HTMLInputElement>(`[id="${key}"]`);
        //                     if (element) {
        //                         element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        //                         setTimeout(() => element.focus(), 500);
        //                         break;
        //                     }
        //                 }
        //             }
        //         }
        //     });
    };

    return (
        <AdmissionFormLayout>
            <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-8 print:p-0 print:bg-white">
                <Head title="Admission Form" />
                <div className="max-w-7xl w-full bg-card text-card-foreground shadow-lg rounded-lg p-6 sm:p-8 print:shadow-none print:p-4">
                    <HeaderSection />

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8" ref={formRef}>
                        {/* Shift */}
                        <ShiftSection shifts={shifts} />

                        {/* Program Selection */}
                        <ProgramSection programGroups={programGroups} />

                        <PersonalInfoSection />

                        {/* Subjects */}
                        <InterSubjectSection />

                        {/* Examination Details */}
                        <ExaminationDetailSection />

                        {/* Notes and Submit */}
                        <div className="mt-8 border-t border-border pt-6">

                            <FormNoteSection />

                            <div className="flex justify-between items-center print:hidden">
                                <div className="text-center self-end">
                                    <span className="text-sm text-gray-600">Crafted with</span>
                                    <span className="text-lg mx-1 animate-pulse">❤️</span>
                                    <span className="text-sm text-gray-600">by</span>
                                    <a
                                        href="https://github.com/FaheemRafiq"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-purple-600 hover:text-purple-800 hover:underline font-semibold mx-1 transition-colors duration-200"
                                    >
                                        Faheem
                                    </a>
                                </div>

                                <Button
                                    variant={'destructive'}
                                    disabled={processing}
                                >
                                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                    <span>Submit Form</span>
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