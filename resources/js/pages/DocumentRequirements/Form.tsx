import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Document, DocumentRequirement, Program, ProgramGroup } from '@/types/database';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';

interface Props {
    documentRequirement?: DocumentRequirement;
    documents: Document[];
    programs: Program[];
    program_groups: ProgramGroup[];
}

export default function Form({ documentRequirement, documents, programs, program_groups }: Props) {
    const isEdit = !!documentRequirement;
    const form = useForm({
        defaultValues: {
            document_id: documentRequirement?.document_id.toString() || '',
            program_group_id: documentRequirement?.program_group_id?.toString() || 'null',
            program_id: documentRequirement?.program_id?.toString() || 'null',
            is_required: documentRequirement?.is_required ?? true,
        },
        onSubmit: async ({ value }) => {
            try {
                const submitValue = {
                    ...value,
                    program_id: value.program_id === 'null' ? null : value.program_id,
                    program_group_id: value.program_group_id === 'null' ? null : value.program_group_id,
                };

                if (isEdit) {
                    await router.put(route('document-requirements.update', documentRequirement.id), submitValue);
                } else {
                    await router.post(route('document-requirements.store'), submitValue);
                }
            } catch (error) {
                console.error(`Error ${isEdit ? 'updating' : 'creating'} document requirement:`, error);
            }
        },
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Document Requirements',
            href: route('document-requirements.index'),
        },
        {
            title: isEdit ? 'Edit Document Requirement' : 'Add Document Requirement',
            href: isEdit ? route('document-requirements.edit', documentRequirement?.id) : route('document-requirements.create'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Document Requirement' : 'Add Document Requirement'} />

            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEdit ? 'Edit Document Requirement' : 'Add Document Requirement'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                void form.handleSubmit();
                            }}
                            className="space-y-6"
                        >
                            <form.Field name="document_id">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel aria-required>Document</FormLabel>
                                        <FormControl>
                                            <Select value={field.state.value} onValueChange={field.handleChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select document" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {documents.map((document) => (
                                                        <SelectItem key={document.id} value={document.id.toString()}>
                                                            {document.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage>{field.state.meta.errors}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <form.Field name="program_group_id">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel>Program Group</FormLabel>
                                        <Select
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                field.handleChange(value);
                                                if (value !== '') {
                                                    form.setFieldValue('program_id', '');
                                                }
                                            }}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select program group" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="null">None</SelectItem>
                                                {program_groups.map((group) => (
                                                    <SelectItem key={group.id} value={group.id.toString()}>
                                                        {group.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage>{field.state.meta.errors}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <form.Field name="program_id">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel>Program</FormLabel>
                                        <Select
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                field.handleChange(value);
                                                if (value !== '') {
                                                    form.setFieldValue('program_group_id', '');
                                                }
                                            }}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select program" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="null">None</SelectItem>
                                                {programs.map((program) => (
                                                    <SelectItem key={program.id} value={program.id.toString()}>
                                                        {program.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage>{field.state.meta.errors}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <form.Field name="is_required">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel>Required</FormLabel>
                                        <Select
                                            value={field.state.value ? 'true' : 'false'}
                                            onValueChange={(value) => field.handleChange(value === 'true')}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select requirement status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="true">Required</SelectItem>
                                                <SelectItem value="false">Optional</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage>{field.state.meta.errors}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <div className="flex justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={() => router.visit(route('document-requirements.index'))}>
                                    Back
                                </Button>
                                <Button type="submit" disabled={form.state.isSubmitting}>
                                    {form.state.isSubmitting ? 'Saving...' : isEdit ? 'Update Document Requirement' : 'Save Document Requirement'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
