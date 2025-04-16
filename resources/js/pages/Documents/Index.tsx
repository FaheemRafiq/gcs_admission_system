import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Document } from '@/types/database';
import { Head, Link, router } from '@inertiajs/react';
import { FileIcon, PencilIcon, Plus, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    documents: Document[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Documents',
        href: route('documents.index'),
    },
];

export default function Index({ documents }: Props) {
    const [open, setOpen] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documents" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileIcon className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Documents</h1>
                    </div>
                    <Button asChild>
                        <Link href={route('documents.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Document
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((document, index) => (
                                <TableRow key={document.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{document.name}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={route('documents.edit', document.id)}>
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
                                                            setDocumentToDelete(document);
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
                    title="Delete Document"
                    description={`Are you sure you want to delete the document "${documentToDelete?.name}"? This action cannot be undone.`}
                    onConfirm={() => {
                        router.delete(route('documents.destroy', documentToDelete?.id));
                    }}
                />
            </div>
        </AppLayout>
    );
}
