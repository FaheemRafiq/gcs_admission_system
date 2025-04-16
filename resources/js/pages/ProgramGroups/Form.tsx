import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ProgramGroup } from '@/types/database';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';

interface Props {
    programGroup?: ProgramGroup;
}

export default function Form({ programGroup }: Props) {
    const isEdit = !!programGroup;
    const form = useForm({
        defaultValues: {
            name: programGroup?.name || '',
            status: programGroup?.status || 'active',
        },
        onSubmit: async ({ value }) => {
            try {
                if (isEdit) {
                    await router.put(route('program-groups.update', programGroup.id), value);
                } else {
                    await router.post(route('program-groups.store'), value);
                }
            } catch (error) {
                console.error(`Error ${isEdit ? 'updating' : 'creating'} program group:`, error);
            }
        },
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Program Groups',
            href: route('program-groups.index'),
        },
        {
            title: isEdit ? 'Edit Program Group' : 'Add Program Group',
            href: isEdit ? route('program-groups.edit', programGroup?.id) : route('program-groups.create'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Program Group' : 'Add Program Group'} />

            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEdit ? 'Edit Program Group' : 'Add Program Group'}</CardTitle>
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
                                                placeholder="Enter program group name"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage>{field.state.meta.errors}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <form.Field name="status">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select value={field.state.value} onValueChange={field.handleChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage>{field.state.meta.errors}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <div className="flex justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={() => router.visit(route('program-groups.index'))}>
                                    Back
                                </Button>
                                <Button type="submit" disabled={form.state.isSubmitting}>
                                    {form.state.isSubmitting ? 'Saving...' : isEdit ? 'Update Program Group' : 'Save Program Group'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
