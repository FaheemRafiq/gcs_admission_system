import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type AdmissionForm, type ResourcePaginator } from '@/types/database';
import { Head } from '@inertiajs/react';
import AdmissionFormTable from './_components/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admission Forms',
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
            <div className="container mx-auto px-4 py-8">
                {/* Admission Forms Table */}
                <AdmissionFormTable admissionForms={admissionForms} filters={filters} />
            </div>
        </AppLayout>
    );
}

export default Dashboard;
