import { useMemo, useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Clock, CheckCircle, Eye, Check, X, DownloadIcon, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type ResourcePaginator, type AdmissionForm } from '@/types/database';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    admissionForms: ResourcePaginator<AdmissionForm>;
    filters: {
        search: string;
        per_page?: number;  // Add per_page to filters
    };
}

function Dashboard({ stats, admissionForms: initialAdmissionForms, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const pageSizeOptions = [10, 25, 50];

    // Debounce search and handle pagination
    useEffect(() => {
        const handler = setTimeout(() => {
            if (search !== filters.search) {  // Only trigger if search changes
                router.get(
                    route('dashboard'),
                    { search, per_page: initialAdmissionForms.meta.per_page },
                    { preserveState: true, preserveScroll: true, replace: true }
                );
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [search, initialAdmissionForms.meta.per_page]);

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
                        >
                            <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        {row.original.status === 'pending' && (
                            <>
                                <Button
                                    variant='successOutline'
                                    size="sm"
                                    onClick={() =>
                                        router.post(route('admission-form.update-status', { id: row.original.form_no, status: 'approved' }), {}, { preserveScroll: true })
                                    }
                                >
                                    <Check className="h-4 w-4 mr-1" /> Approve
                                </Button>
                                <Button
                                    variant="destructiveOutline"
                                    size="sm"
                                    onClick={() =>
                                        router.post(route('admission-form.update-status', { id: row.original.form_no, status: 'rejected' }), {}, { preserveScroll: true })
                                    }
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

    const handleExport = () => {
        window.location.href = route('admission-forms.export', { search });
    };

    const table = useReactTable({
        data: initialAdmissionForms.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
                <div className="flex-1 flex flex-col justify-between rounded-xl border border-border bg-card p-4">
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Admission Forms</h2>
                            <div className='flex gap-2'>
                                <Input
                                    placeholder="Search forms..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="max-w-xs border-border bg-card text-card-foreground"
                                />
                                <Button onClick={handleExport}>
                                    <DownloadIcon className="h-4 w-4 mr-2" /> Export
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto overflow-y-hidden">
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

                    {/* Pagination Controls */}
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm">
                            Showing {initialAdmissionForms.data.length} of {initialAdmissionForms.meta.total} forms
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className="flex items-center space-x-2 mr-4">
                                <p className="text-sm font-medium">Rows per page</p>
                                <Select
                                    value={`${initialAdmissionForms.meta.per_page}`}
                                    onValueChange={(value) => {
                                        router.get(
                                            route('dashboard'),
                                            { per_page: value, search, page: 1 }, // Reset to page 1 on per_page change
                                            { preserveState: true, preserveScroll: true }
                                        );
                                    }}
                                >
                                    <SelectTrigger className="h-8 w-[70px]">
                                        <SelectValue placeholder={initialAdmissionForms.meta.per_page} />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {pageSizeOptions.map(size => (
                                            <SelectItem key={size} value={`${size}`}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => router.get(initialAdmissionForms.links.first, { search, per_page: initialAdmissionForms.meta.per_page }, { preserveScroll: true })}
                                    disabled={!initialAdmissionForms.links.first}
                                >
                                    <ChevronsLeft />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => router.get(initialAdmissionForms.links.prev ?? '', { search, per_page: initialAdmissionForms.meta.per_page }, { preserveScroll: true })}
                                    disabled={!initialAdmissionForms.links.prev}
                                >
                                    <ChevronLeft />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => router.get(initialAdmissionForms.links.next ?? '', { search, per_page: initialAdmissionForms.meta.per_page }, { preserveScroll: true })}
                                    disabled={!initialAdmissionForms.links.next}
                                >
                                    <ChevronRight />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => router.get(initialAdmissionForms.links.last, { search, per_page: initialAdmissionForms.meta.per_page }, { preserveScroll: true })}
                                    disabled={!initialAdmissionForms.links.last}
                                >
                                    <ChevronsRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default Dashboard;