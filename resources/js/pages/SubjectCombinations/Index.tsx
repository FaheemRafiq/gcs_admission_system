import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { SubjectCombination } from '@/types/database';
import { Head, Link, router } from '@inertiajs/react';
import { BookOpenIcon, PencilIcon, Plus, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    combinations: SubjectCombination[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subject Combinations',
        href: route('subject-combinations.index'),
    },
];

export default function Index({ combinations }: Props) {
    const [open, setOpen] = useState(false);
    const [combinationToDelete, setCombinationToDelete] = useState<SubjectCombination | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subject Combinations" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BookOpenIcon className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Subject Combinations</h1>
                    </div>
                    <Button asChild>
                        <Link href={route('subject-combinations.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Combination
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>Program</TableHead>
                                <TableHead>Shift</TableHead>
                                <TableHead>Subjects</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {combinations.map((combination, index) => (
                                <TableRow key={combination.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{combination.program?.name}</TableCell>
                                    <TableCell>{combination.shift?.name || 'Both'}</TableCell>
                                    <TableCell>{combination.subjects.join(', ')}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={route('subject-combinations.edit', combination.id)}>
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
                                                            setCombinationToDelete(combination);
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
                    title="Delete Subject Combination"
                    description={`Are you sure you want to delete this combination of subjects: ${combinationToDelete?.subjects.join(', ')} for ${combinationToDelete?.program?.name}? This action cannot be undone.`}
                    onConfirm={() => {
                        router.delete(route('subject-combinations.destroy', combinationToDelete?.id));
                        setOpen(false);
                    }}
                />
            </div>
        </AppLayout>
    );
}
