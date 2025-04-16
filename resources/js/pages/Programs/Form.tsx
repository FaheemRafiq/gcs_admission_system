import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Program, ProgramGroup, Shift, Status } from '@/types/database';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';

interface Props {
    program?: Program;
    program_groups: ProgramGroup[];
    shifts: Shift[];
}

export default function Form({ program, program_groups, shifts }: Props) {
    const isEdit = !!program;
    const form = useForm({
        defaultValues: {
            name: program?.name || '',
            abbreviation: program?.abbreviation || '',
            program_group_id: program?.program_group_id?.toString() || '',
            shift_id: program?.shift_id?.toString() || 'none',
            status: program?.status || 'active',
        },
        onSubmit: async ({ value }) => {
            try {
                if (isEdit) {
                    await router.put(route('programs.update', program.id), value);
                } else {
                    await router.post(route('programs.store'), value);
                }
            } catch (error) {
                console.error(`Error ${isEdit ? 'updating' : 'creating'} program:`, error);
            }
        },
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Programs',
            href: route('programs.index'),
        },
        {
            title: isEdit ? 'Edit Program' : 'Add Program',
            href: isEdit ? route('programs.edit', program?.id) : route('programs.create'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Program' : 'Add Program'} />

            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEdit ? 'Edit Program' : 'Add Program'}</CardTitle>
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
                                                placeholder="Enter program name"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage>{field.state.meta.errors}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <form.Field name="abbreviation">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel>Abbreviation</FormLabel>
                                        <FormControl>
                                            <Input
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter program abbreviation"
                                                maxLength={10}
                                            />
                                        </FormControl>
                                        <FormMessage>{field.state.meta.errors}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <form.Field name="program_group_id">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel aria-required>Program Group</FormLabel>
                                        <Select value={field.state.value} onValueChange={field.handleChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select program group" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {program_groups?.map((group) => (
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

                            <form.Field name="shift_id">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel>Shift</FormLabel>
                                        <Select value={field.state.value} onValueChange={field.handleChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select shift" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="none">All Shifts</SelectItem>
                                                {shifts.map((shift) => (
                                                    <SelectItem key={shift.id} value={shift.id.toString()}>
                                                        {shift.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                <Button type="button" variant="outline" onClick={() => router.visit(route('programs.index'))}>
                                    Back
                                </Button>
                                <Button type="submit" disabled={form.state.isSubmitting}>
                                    {form.state.isSubmitting ? 'Saving...' : isEdit ? 'Update Program' : 'Save Program'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
