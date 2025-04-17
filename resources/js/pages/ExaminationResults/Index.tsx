import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { ExaminationResult } from '@/types/database';
import { Head, Link, router } from '@inertiajs/react';
import { ClipboardListIcon, PencilIcon, Plus, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

interface Props extends SharedData {
    examinationResults: ExaminationResult[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Examination Results',
        href: route('examination-results.index'),
    },
];

export default function Index({ examinationResults }: Props) {
    const [open, setOpen] = useState(false);
    const [resultToDelete, setResultToDelete] = useState<ExaminationResult | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Examination Results" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ClipboardListIcon className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Examination Results</h1>
                    </div>
                    <Button asChild>
                        <Link href={route('examination-results.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Examination Result
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {examinationResults.map((examinationResult, index) => (
                                <TableRow key={examinationResult.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{examinationResult.title}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={route('examination-results.edit', examinationResult.id)}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Edit</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive h-8 w-8"
                                                        onClick={() => {
                                                            setResultToDelete(examinationResult);
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        <Trash2Icon className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Delete</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <ConfirmationDialog
                    open={open}
                    setOpen={setOpen}
                    title="Delete Examination Result"
                    description={
                        <>
                            Are you sure you want to delete <strong>"{resultToDelete?.title}"</strong>? <strong>This action cannot be undone.</strong>
                        </>
                    }
                    onConfirm={() => {
                        router.delete(route('examination-results.destroy', resultToDelete?.id));
                    }}
                />
            </div>
        </AppLayout>
    );
}
