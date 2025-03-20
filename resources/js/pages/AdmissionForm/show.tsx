import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { type AdmissionForm } from '@/types/database';
import AdmissionFormView from '@/components/admission-form-view';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';

interface Props {
    form: AdmissionForm;
}

const AdmissionFormShow: React.FC<Props> = ({ form }) => {
    return (
        <AppLayout>
            <div className="flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
                <Head title="Admission Form View" />

                <div className="w-full max-w-7xl bg-card text-card-foreground overflow-hidden border border-border rounded-xl">

                    <div className="flex justify-between items-center p-3 border-b border-border shadow-sm">
                        <div>
                            <Badge variant={form.status === 'rejected' ? 'destructive' : form.status === 'approved' ? 'success' : 'pending'} className='capitalize'>{form.status}</Badge>
                        </div>
                        <Link href={route('dashboard')}>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 px-4 sm:px-6 py-2 w-full sm:w-auto"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8 print:p-4">
                        {/* AdmissionFormView */}
                        <AdmissionFormView form={form} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default AdmissionFormShow;