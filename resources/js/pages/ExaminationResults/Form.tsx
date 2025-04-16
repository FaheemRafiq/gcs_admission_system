import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import type { ExaminationResult } from '@/types/database';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';

interface Props {
    examinationResult?: ExaminationResult;
}

export default function Form({ examinationResult }: Props) {
    const isEdit = !!examinationResult;
    const form = useForm({
        defaultValues: {
            title: examinationResult?.title || '',
        },
        onSubmit: async ({ value }) => {
            try {
                if (isEdit) {
                    router.put(route('examination-results.update', examinationResult.id), value);
                } else {
                    router.post(route('examination-results.store'), value);
                }
            } catch (error) {
                console.error('Error saving examination result:', error);
            }
        },
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Examination Results',
            href: route('examination-results.index'),
        },
        {
            title: isEdit ? 'Edit Examination Result' : 'Add Examination Result',
            href: route('examination-results.create'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Examination Result' : 'Add Examination Result'} />

            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEdit ? 'Edit Examination Result' : 'Add Examination Result'}</CardTitle>
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
                            <form.Field name="title">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel aria-required>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter examination result title"
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
                                    {form.state.isSubmitting ? 'Saving...' : isEdit ? 'Update Examination Result' : 'Save Examination Result'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
