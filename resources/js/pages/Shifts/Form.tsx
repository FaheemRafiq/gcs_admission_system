import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import type { Shift, Status } from '@/types/database';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';

interface Props {
    shift?: Shift;
}

export default function Form({ shift }: Props) {
    const isEdit = !!shift;
    const form = useForm({
        defaultValues: {
            name: shift?.name || '',
            status: shift?.status || 'active',
        },
        onSubmit: async ({ value }) => {
            try {
                if (isEdit) {
                    await router.put(route('shifts.update', shift.id), value);
                } else {
                    await router.post(route('shifts.store'), value);
                }
            } catch (error) {
                console.error(`Error ${isEdit ? 'updating' : 'creating'} shift:`, error);
            }
        },
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Shifts',
            href: route('shifts.index'),
        },
        {
            title: isEdit ? 'Edit Shift' : 'Add Shift',
            href: isEdit ? route('shifts.edit', shift?.id) : route('shifts.create'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Shift' : 'Add Shift'} />

            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEdit ? 'Edit Shift' : 'Add Shift'}</CardTitle>
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
                                                placeholder="Enter shift name"
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
                                        <Select value={field.state.value} onValueChange={(value) => field.handleChange(value as Status)}>
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
                                <Button type="button" variant="outline" onClick={() => router.visit(route('shifts.index'))}>
                                    Back
                                </Button>
                                <Button type="submit" disabled={form.state.isSubmitting}>
                                    {form.state.isSubmitting ? 'Saving...' : isEdit ? 'Update Shift' : 'Save Shift'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
