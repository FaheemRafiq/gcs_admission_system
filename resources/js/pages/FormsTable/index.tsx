import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type AdmissionForm, type ResourcePaginator } from '@/types/database';
import { Head } from '@inertiajs/react';
import { CheckCircle, Clock, Users } from 'lucide-react';
import AdmissionFormTable from './_components/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forms',
        href: route('admission-forms.index'),
    },
];

interface Props {
    admissionForms: ResourcePaginator<AdmissionForm>;
    filters: {
        search: string;
        per_page?: number; // Add per_page to filters
    };
}


function Dashboard({ admissionForms, filters }: Props) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="bg-background flex h-full flex-1 flex-col gap-6 p-4 sm:p-6 md:p-8">
                {/* Admission Forms Table */}
                <AdmissionFormTable admissionForms={admissionForms} filters={filters} />
            </div>
        </AppLayout>
    );
}

export default Dashboard;
