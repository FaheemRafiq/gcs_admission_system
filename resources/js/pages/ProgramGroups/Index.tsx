import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import type { ProgramGroup } from '@/types/database';
import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, BookOpenIcon, PencilIcon, Plus, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

interface Props extends SharedData {
    programGroups: ProgramGroup[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Program Groups',
        href: route('program-groups.index'),
    },
];

export default function Index({ programGroups }: Props) {
    const [open, setOpen] = useState(false);
    const [programGroupToDelete, setProgramGroupToDelete] = useState<ProgramGroup | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Program Groups" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BookOpenIcon className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Program Groups</h1>
                    </div>
                    <Button asChild>
                        <Link href={route('program-groups.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Program Group
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {programGroups.map((programGroup, index) => (
                                <TableRow key={programGroup.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{programGroup.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={programGroup.status === 'active' ? 'success' : 'destructive'}>{programGroup.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={route('program-groups.examination-results', programGroup.id)}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <BookOpen className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Assign Examination Results</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={route('program-groups.edit', programGroup.id)}>
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
                                                            setProgramGroupToDelete(programGroup);
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
                    title="Delete Program Group"
                    description={
                        <>
                            Are you sure you want to delete <strong>"{programGroupToDelete?.name}"</strong>?{' '}
                            <strong>This action cannot be undone.</strong>
                        </>
                    }
                    onConfirm={() => {
                        router.delete(route('program-groups.destroy', programGroupToDelete?.id));
                    }}
                />
            </div>
        </AppLayout>
    );
}
