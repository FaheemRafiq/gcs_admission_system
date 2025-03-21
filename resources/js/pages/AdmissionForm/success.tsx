import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Printer } from 'lucide-react';
import { type AdmissionForm } from '@/types/database';
import AdmissionFormLayout from '@/layouts/MainLayout';
import AdmissionFormView from '@/components/admission-form-view';

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
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <AdmissionFormLayout>
            <div className="bg-gray-50 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
                <Head title="Admission Form Submitted Successfully" />

                <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
                    {/* Success Header - Fully Responsive */}
                    <div className="bg-green-50 px-4 py-6 sm:px-6 lg:px-8 border-b border-green-100">
                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 mb-4">
                            <CheckCircle2 className="h-10 w-10 text-green-500 flex-shrink-0" />
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">Form Submitted Successfully!</h1>
                        </div>
                        <p className="text-center sm:text-left text-gray-600 max-w-3xl">
                            Congratulations, <span className="font-medium">{form.name}</span>! Your admission form has been successfully submitted.
                            Below are the details you provided for your records.
                        </p>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8 print:p-4">
                        {/* AdmissionFormView */}

                        <AdmissionFormView form={form} />

                        {/* Action Button */}
                        <div className="mt-10 flex justify-center gap-4 print:hidden">
                            <Link href={route('admission-form.index')}>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2 px-4 sm:px-6 py-2 w-full sm:w-auto"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Apply
                                </Button>
                            </Link>

                            <Button
                                variant="default"
                                onClick={handlePrint}
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 sm:px-6 py-2 w-full sm:w-auto"
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
                                </a>
                                {' '}or call our helpline at +1-800-COLLEGE.
                            </p>
                            <p className="text-center text-xs text-gray-400 mt-2">
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