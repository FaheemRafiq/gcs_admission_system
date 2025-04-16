import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import type { Program } from '@/types/database';
import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, GraduationCapIcon, PencilIcon, Plus, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

interface Props extends SharedData {
    programs: Program[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Programs',
        href: route('programs.index'),
    },
];

export default function Index({ programs }: Props) {
    const [open, setOpen] = useState(false);
    const [programToDelete, setProgramToDelete] = useState<Program | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Programs" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GraduationCapIcon className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Programs</h1>
                    </div>
                    <Button asChild>
                        <Link href={route('programs.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Program
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Program Group</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {programs.map((program, index) => (
                                <TableRow key={program.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{program.name}</TableCell>
                                    <TableCell>{program.program_group?.name}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={route('programs.examination-results', program.id)}>
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
                                                    <Link href={route('programs.edit', program.id)}>
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
                                                            setProgramToDelete(program);
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
                    title="Delete Program"
                    description={`Are you sure you want to delete "${programToDelete?.name}"? This action cannot be undone.`}
                    onConfirm={() => {
                        router.delete(route('programs.destroy', programToDelete?.id));
                    }}
                />
            </div>
        </AppLayout>
    );
}
