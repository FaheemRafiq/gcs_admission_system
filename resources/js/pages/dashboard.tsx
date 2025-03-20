import { useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Clock, CheckCircle, Eye, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type AdmissionForm } from '@/types/database';

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
    };
    admissionForms: AdmissionForm[];
}

export default function Dashboard({ stats, admissionForms }: Props) {
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = useMemo<ColumnDef<AdmissionForm>[]>(
        () => [
            {
                accessorKey: 'form_no',
                header: 'Form No',
                cell: ({ row }) => <span>{row.original.form_no}</span>,
            },
            {
                accessorKey: 'photo_path',
                header: 'Photo',
                cell: ({ row }) => (
                    <img
                        src={row.original.photo_path}
                        alt={row.original.name}
                        className="w-10 h-10 object-cover rounded-full"
                    />
                ),
            },
            {
                accessorKey: 'name',
                header: 'Name',
                cell: ({ row }) => <span>{row.original.name}</span>,
            },
            {
                accessorKey: 'program',
                header: 'Program',
                cell: ({ row }) => (
                    <span><span className="uppercase">{row.original.program_category}</span>{` - ${row.original.program_value}`}</span>
                ),
            },
            {
                accessorKey: 'shift',
                header: 'Shift',
                cell: ({ row }) => <span>{row.original.shift}</span>,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => (
                    <Badge
                        variant={row.original.status === 'rejected' ? 'destructive' : row.original.status === 'approved' ? 'success' : 'pending'}
                    >
                        {row.original.status}
                    </Badge>
                ),
            },
            {
                accessorKey: 'created_at',
                header: 'Submitted On',
                cell: ({ row }) => (
                    <span>{new Date(row.original.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.get(route('admission-form.show', { id: row.original.form_no }))}
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        {row.original.status === 'pending' && (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        router.post(route('admission-form.update-status',{ id: row.original.form_no, status: 'approved' }))
                                    }
                                    className="border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-700"
                                >
                                    <Check className="h-4 w-4 mr-1" /> Approve
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        router.post(route('admission-form.update-status',{ id: row.original.form_no, status: 'rejected' }))
                                    }
                                    className="border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-700"
                                >
                                    <X className="h-4 w-4 mr-1" /> Reject
                                </Button>
                            </>
                        )}
                    </div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: admissionForms,
        columns,
        state: { globalFilter },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6 md:p-8 bg-background">
                {/* Stats Section */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Card className="border border-border bg-card">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Admissions</CardTitle>
                            <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalAdmissions}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">All submitted forms</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border bg-card">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending Forms</CardTitle>
                            <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingForms}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Awaiting review</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border bg-card">
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

                {/* Admission Forms Table */}
                <div className="flex-1 rounded-xl border border-border bg-card p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Admission Forms</h2>
                        <Input
                            placeholder="Search forms..."
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="max-w-xs border-border bg-card text-card-foreground"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="border-gray-200 dark:border-gray-700">
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id} className="text-gray-600 dark:text-gray-300">
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} className="border-border hover:bg-muted/50">
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="text-card-foreground">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500 dark:text-gray-400">
                                            No admission forms found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}