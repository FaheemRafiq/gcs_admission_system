import AdmissionFormView from '@/components/admission-form-view';
import { Button } from '@/components/ui/button';
import AdmissionFormLayout from '@/layouts/MainLayout';
import { type AdmissionForm } from '@/types/database';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Printer } from 'lucide-react';
import React from 'react';

interface Props {
    form: AdmissionForm;
}

const AdmissionSuccess: React.FC<Props> = ({ form }) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (e) {
            console.error('Error formatting date:', e);
            return dateString;
        }
    };

    const handleDownloadPDF = () => {
        window.open(route('admission-form.download-pdf', { form: form.form_no }), '_blank');
    };

    return (
        <AdmissionFormLayout>
            <div className="flex items-center justify-center bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 print:bg-white print:p-0">
                <Head title="Admission Form Submitted Successfully" />

                <div className="w-full max-w-7xl overflow-hidden rounded-lg bg-white shadow-lg print:shadow-none">
                    {/* Success Header - Fully Responsive */}
                    <div className="border-b border-green-100 bg-green-50 px-4 py-6 sm:px-6 lg:px-8">
                        <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start">
                            <CheckCircle2 className="h-10 w-10 flex-shrink-0 text-green-500" />
                            <h1 className="text-center text-2xl font-bold text-gray-800 sm:text-left sm:text-3xl">Form Submitted Successfully!</h1>
                        </div>
                        <p className="max-w-3xl text-center text-lg text-gray-600 sm:text-left">
                            <span className="text-xl font-semibold text-gray-800">Congratulations, {form.name}!</span>
                            <span className="mt-2 block text-base">
                                Your admission form for the <span className="font-medium">{form.program?.program_full_name}</span> program has been
                                successfully submitted.
                            </span>
                            <span className="mt-4 block text-sm">Below are the details you provided for your records.</span>
                        </p>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8 print:p-4">
                        {/* AdmissionFormView */}

                        <AdmissionFormView form={form} />

                        {/* Action Button */}
                        <div className="mt-10 flex justify-center gap-4 print:hidden">
                            <Link href={route('admission-form.index')}>
                                <Button variant="outline" className="flex w-full items-center gap-2 px-4 py-2 sm:w-auto sm:px-6">
                                    <ArrowLeft className="h-4 w-4" />
                                    Apply
                                </Button>
                            </Link>

                            <Button
                                variant="default"
                                onClick={() => handleDownloadPDF()}
                                className="flex w-full items-center gap-2 bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:w-auto sm:px-6"
                            >
                                <Printer className="h-4 w-4" />
                                Print Form Details
                            </Button>
                        </div>

                        {/* Footer Note */}
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <p className="text-center text-sm text-gray-500">
                                For any queries regarding your application, please contact us at{' '}
                                <a href="mailto:admissions@example.com" className="text-blue-600 hover:underline">
                                    admissions@example.com
                                </a>{' '}
                                or call our helpline at +1-800-COLLEGE.
                            </p>
                            <p className="mt-2 text-center text-xs text-gray-400">
                                Application submitted on {formatDate(form.created_at)} • Form #: {form.form_no}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdmissionFormLayout>
    );
};

export default AdmissionSuccess;
