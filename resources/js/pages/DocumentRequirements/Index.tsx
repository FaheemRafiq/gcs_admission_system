import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { type DocumentRequirement } from '@/types/database';
import { Head, Link, router } from '@inertiajs/react';
import { FileText, PencilIcon, Plus, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    documentRequirements: DocumentRequirement[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Document Requirements',
        href: route('document-requirements.index'),
    },
];

export default function Index({ documentRequirements }: Props) {
    const [open, setOpen] = useState(false);
    const [requirementToDelete, setRequirementToDelete] = useState<DocumentRequirement | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Document Requirements" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Document Requirements</h1>
                    </div>
                    <Button asChild>
                        <Link href={route('document-requirements.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Document Requirement
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>Document</TableHead>
                                <TableHead>Program Group</TableHead>
                                <TableHead>Program</TableHead>
                                <TableHead>Required</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documentRequirements.map((requirement, index) => (
                                <TableRow key={requirement.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{requirement.document?.name}</TableCell>
                                    <TableCell>{requirement.program_group?.name || 'N/A'}</TableCell>
                                    <TableCell>{requirement.program?.name || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Badge variant={requirement.is_required ? 'success' : 'secondary'}>
                                            {requirement.is_required ? 'Required' : 'Optional'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={route('document-requirements.edit', requirement.id)}>
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
                                                            setRequirementToDelete(requirement);
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
                    title="Delete Document Requirement"
                    description={
                        <>
                            Are you sure you want to delete this <strong>"{requirementToDelete?.document?.name}"</strong> document requirement?{' '}
                            <strong>This action cannot be undone.</strong>
                        </>
                    }
                    onConfirm={() => {
                        router.delete(route('document-requirements.destroy', requirementToDelete?.id));
                    }}
                />
            </div>
        </AppLayout>
    );
}
