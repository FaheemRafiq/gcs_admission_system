import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CheckCircle, Clock, Users } from 'lucide-react';
import { BarChartComponent } from './_components/BarChartComponent';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    stats: {
        totalAdmissions: number;
        pendingForms: number;
        approvedForms: number;
    }
}

function Dashboard({ stats }: Props) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="bg-background flex h-full flex-1 flex-col gap-6 p-4 sm:p-6 md:p-8">
                
                {/* Stats Section */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Card className="border-border bg-card border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Admissions</CardTitle>
                            <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalAdmissions}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">All submitted forms</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border bg-card border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending Forms</CardTitle>
                            <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingForms}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Awaiting review</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border bg-card border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Approved Forms</CardTitle>
                            <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.approvedForms}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Successfully approved</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Bar Chart */}
                <BarChartComponent />
            </div>
        </AppLayout>
    );
}

export default Dashboard;
