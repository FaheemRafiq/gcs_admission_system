import AdmissionFormView from '@/components/admission-form-view';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { type AdmissionForm } from '@/types/database';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import StatusDropdown from './_components/StatusDropdown';

interface Props {
    form: AdmissionForm;
}

const AdmissionFormShow: React.FC<Props> = ({ form }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admission Forms',
            href: route('admission-forms.index'),
        },
        {
            title: 'Admission Form View',
            href: route('admission-forms.show', { id: form.form_key }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <Head title="Admission Form View" />

                <div className="bg-card text-card-foreground border-border w-full overflow-hidden rounded-md border">
                    <div className="border-border flex items-center justify-between border-b p-3 shadow-sm">
                        <div>
                            <StatusDropdown formNo={form.form_no.toString()} status={form.status} />
                        </div>
                        <Link href={route('admission-form.index')}>
                            <Button variant="outline" className="flex w-full items-center gap-2 px-4 py-2 sm:w-auto sm:px-6">
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
