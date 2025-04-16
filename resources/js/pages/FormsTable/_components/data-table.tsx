import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { type AdmissionForm, type ResourcePaginator } from '@/types/database';
import { router } from '@inertiajs/react';
import { Column, ColumnPinningState, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, DownloadIcon, TableOfContentsIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns } from './columns';

interface AdmissionFormTableProps {
    admissionForms: ResourcePaginator<AdmissionForm>;
    filters: {
        search: string;
        per_page?: number; // Add per_page to filters
    };
}

function AdmissionFormTable({ admissionForms: initialAdmissionForms, filters }: AdmissionFormTableProps) {
    const [search, setSearch] = useState(filters.search || '');
    const pageSizeOptions = [10, 25, 50];
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
        left: [],
        right: ['actions'],
    });

    const getCommonPinningClasses = (column: Column<AdmissionForm>): object => {
        const isPinned = column.getIsPinned();
        const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
        const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

        return {
            'sticky left-0 z-10 opacity-95': isPinned === 'left',
            'sticky right-0 z-10 opacity-95': isPinned === 'right',
            'shadow-[inset_-4px_0_4px_-4px_gray] border-r border-border': isLastLeftPinnedColumn,
            'shadow-[inset_4px_0_4px_-4px_gray] border-l border-border': isFirstRightPinnedColumn,
            'bg-background': isPinned,
        };
    };

    // Debounce search and handle pagination
    useEffect(() => {
        const handler = setTimeout(() => {
            if (search !== filters.search) {
                // Only trigger if search changes
                router.get(
                    route('dashboard'),
                    { search, per_page: initialAdmissionForms.meta.per_page },
                    { preserveState: true, preserveScroll: true, replace: true },
                );
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [search, initialAdmissionForms.meta.per_page]);

    const handleExport = () => {
        window.location.href = route('admission-forms.export', { search });
    };

    const table = useReactTable({
        data: initialAdmissionForms.data,
        columns,
        state: {
            columnPinning,
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnPinningChange: setColumnPinning,
    });

    return (
        <div className="bg-card flex flex-1 flex-col justify-between">
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TableOfContentsIcon className="h-6 w-6" />
                        <h2 className="text-2xl font-semibold">Admission Forms</h2>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Search forms..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-border bg-card text-card-foreground max-w-xs"
                        />
                        <Button onClick={handleExport}>
                            <DownloadIcon className="mr-2 h-4 w-4" /> Export
                        </Button>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-gray-200 dark:border-gray-700">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        style={{
                                            width: `${header.getSize()}px`,
                                            minWidth: `${header.getSize()}px`,
                                            maxWidth: `${header.getSize()}px`,
                                        }}
                                        colSpan={header.colSpan}
                                        key={header.id}
                                        className={cn(getCommonPinningClasses(header.column), 'text-gray-600 dark:text-gray-300')}
                                    >
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
                                        <TableCell key={cell.id} className={cn(getCommonPinningClasses(cell.column), 'text-card-foreground')}>
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

            {/* Pagination Controls */}
            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm">
                    Showing {initialAdmissionForms.data.length} of {initialAdmissionForms.meta.total} forms
                </div>
                <div className="flex items-center gap-2">
                    <div className="mr-4 flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            value={`${initialAdmissionForms.meta.per_page}`}
                            onValueChange={(value) => {
                                router.get(
                                    route('dashboard'),
                                    { per_page: value, search, page: 1 }, // Reset to page 1 on per_page change
                                    { preserveState: true, preserveScroll: true },
                                );
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={initialAdmissionForms.meta.per_page} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {pageSizeOptions.map((size) => (
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
                            onClick={() =>
                                router.get(
                                    initialAdmissionForms.links.first,
                                    { search, per_page: initialAdmissionForms.meta.per_page },
                                    { preserveScroll: true },
                                )
                            }
                            disabled={!initialAdmissionForms.links.first}
                        >
                            <ChevronsLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                                router.get(
                                    initialAdmissionForms.links.prev ?? '',
                                    { search, per_page: initialAdmissionForms.meta.per_page },
                                    { preserveScroll: true },
                                )
                            }
                            disabled={!initialAdmissionForms.links.prev}
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                                router.get(
                                    initialAdmissionForms.links.next ?? '',
                                    { search, per_page: initialAdmissionForms.meta.per_page },
                                    { preserveScroll: true },
                                )
                            }
                            disabled={!initialAdmissionForms.links.next}
                        >
                            <ChevronRight />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() =>
                                router.get(
                                    initialAdmissionForms.links.last,
                                    { search, per_page: initialAdmissionForms.meta.per_page },
                                    { preserveScroll: true },
                                )
                            }
                            disabled={!initialAdmissionForms.links.last}
                        >
                            <ChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdmissionFormTable;
