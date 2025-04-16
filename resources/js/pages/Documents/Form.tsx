import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Document } from '@/types/database';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';

interface Props {
    document?: Document;
}

export default function Form({ document }: Props) {
    const isEdit = !!document;
    const form = useForm({
        defaultValues: {
            name: document?.name || '',
        },
        onSubmit: async ({ value }) => {
            try {
                if (isEdit) {
                    router.put(route('documents.update', document.id), value);
                } else {
                    router.post(route('documents.store'), value);
                }
            } catch (error) {
                console.error('Error saving document:', error);
            }
        },
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Documents',
            href: route('documents.index'),
        },
        {
            title: isEdit ? 'Edit Document' : 'Add Document',
            href: route('documents.create'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Document' : 'Add Document'} />

            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEdit ? 'Edit Document' : 'Add Document'}</CardTitle>
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
                            <form.Field name="name">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel aria-required>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter document name"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage>{field.state.meta.errors}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <div className="flex justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={() => router.visit(route('documents.index'))}>
                                    Back
                                </Button>
                                <Button type="submit" disabled={form.state.isSubmitting}>
                                    {form.state.isSubmitting ? 'Saving...' : isEdit ? 'Update Document' : 'Save Document'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
