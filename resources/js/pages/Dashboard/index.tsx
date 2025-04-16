import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CheckCircle, Clock, Users, XCircle } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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
        rejectedForms: number;
    };
    programStats: Array<{ name: string; count: number }>;
    programGroupStats: Array<{ name: string; count: number }>;
    statusDistribution: Array<{ status: string; count: number }>;
    monthlyAdmissions: Array<{ month: string; count: number }>;
    shiftDistribution: Array<{ shift: string; count: number }>;
    examinationResultsUsage: Array<{ title: string; count: number }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Dashboard({
    stats,
    programStats,
    programGroupStats,
    statusDistribution,
    monthlyAdmissions,
    shiftDistribution,
    examinationResultsUsage,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="bg-background flex h-full flex-1 flex-col gap-6 p-4 sm:p-6 md:p-8">
                {/* Stats Section */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
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
                    <Card className="border-border bg-card border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Rejected Forms</CardTitle>
                            <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.rejectedForms}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Not approved</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Monthly Admissions Trend */}
                    <Card className="border-border bg-card border">
                        <CardHeader>
                            <CardTitle>Monthly Admissions Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={monthlyAdmissions}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="count" stroke="#8884d8" name="Admissions" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Status Distribution */}
                    <Card className="border-border bg-card border">
                        <CardHeader>
                            <CardTitle>Form Status Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={statusDistribution} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                                            {statusDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Programs */}
                    <Card className="border-border bg-card border">
                        <CardHeader>
                            <CardTitle>Top Programs by Admissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={programStats}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#8884d8" name="Admissions" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shift Distribution */}
                    <Card className="border-border bg-card border">
                        <CardHeader>
                            <CardTitle>Shift Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={shiftDistribution} dataKey="count" nameKey="shift" cx="50%" cy="50%" outerRadius={80} label>
                                            {shiftDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Program Groups */}
                    <Card className="border-border bg-card border">
                        <CardHeader>
                            <CardTitle>Program Groups</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={programGroupStats}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#82ca9d" name="Programs" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Examination Results Usage */}
                    <Card className="border-border bg-card border">
                        <CardHeader>
                            <CardTitle>Top Examination Results Usage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={examinationResultsUsage}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="title" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#ffc658" name="Programs" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

export default Dashboard;
