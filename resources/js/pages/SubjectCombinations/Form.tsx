import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import type { Program, Shift, SubjectCombination } from '@/types/database';
import { Head, router } from '@inertiajs/react';
import { useForm, useStore } from '@tanstack/react-form';
import React, { useCallback, useMemo, useState } from 'react';

interface Props {
    programs: Program[];
    shifts: Shift[];
    combination?: SubjectCombination;
}

export default function Form({ programs, shifts, combination }: Props) {
    const isEdit = !!combination;
    const [subjects, setSubjects] = useState<string[]>(combination?.subjects?.length ? combination.subjects : ['']);

    const defaultValues = useMemo(
        () => ({
            program_id: combination?.program_id?.toString() || '',
            shift_id: combination?.shift_id?.toString() || '',
            subjects: subjects,
        }),
        [combination?.program_id, combination?.shift_id, subjects],
    );

    const form = useForm({
        defaultValues,
        onSubmit: async ({ value }) => {
            try {
                const payload = {
                    ...value,
                    program_id: parseInt(value.program_id),
                    shift_id: parseInt(value.shift_id),
                    subjects: value.subjects.filter((subject) => subject !== null && subject.trim() !== ''),
                };

                if (isEdit) {
                    router.put(route('subject-combinations.update', combination.id), payload);
                } else {
                    router.post(route('subject-combinations.store'), payload);
                }
            } catch (error) {
                console.error('Error saving combination:', error);
            }
        },
    });

    const updatedSubjects = useStore(form.store, (state) => state.values.subjects);

    React.useEffect(() => {
        if (updatedSubjects.length > 0 && updatedSubjects !== subjects) {
            setSubjects(updatedSubjects);
        }
    }, [updatedSubjects]);

    const addSubject = useCallback(() => {
        const currentSubjects = [...form.state.values.subjects];
        currentSubjects.push('');
        setSubjects(currentSubjects);
        form.setFieldValue('subjects', currentSubjects);
    }, [form]);

    const removeSubject = useCallback(
        (index: number) => {
            const newSubjects = form.state.values.subjects.filter((_, i) => i !== index);
            setSubjects(newSubjects);
            form.setFieldValue('subjects', newSubjects.length ? newSubjects : ['']);
        },
        [form],
    );

    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => [
            {
                title: 'Subject Combinations',
                href: route('subject-combinations.index'),
            },
            {
                title: isEdit ? 'Edit Subject Combination' : 'Add Subject Combination',
                href: route('subject-combinations.create'),
            },
        ],
        [isEdit],
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
        },
        [form],
    );

    const handleBack = useCallback(() => {
        router.visit(route('subject-combinations.index'));
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Subject Combination' : 'Add Subject Combination'} />

            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEdit ? 'Edit Subject Combination' : 'Add Subject Combination'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <form.Field name="program_id">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel aria-required>Program</FormLabel>
                                        <FormControl>
                                            <Select
                                                name={field.name}
                                                value={field.state.value || ''}
                                                onValueChange={field.handleChange}
                                                onOpenChange={field.handleBlur}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a program" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {programs.map((program) => (
                                                        <SelectItem key={program.id} value={program.id.toString()}>
                                                            {program.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage>{field.state.meta.errors.join(', ')}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <form.Field name="shift_id">
                                {(field) => (
                                    <FormItem>
                                        <FormLabel aria-required>Shift</FormLabel>
                                        <FormControl>
                                            <Select
                                                name={field.name}
                                                value={field.state.value || ''}
                                                onValueChange={field.handleChange}
                                                onOpenChange={field.handleBlur}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a shift" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {shifts.map((shift) => (
                                                        <SelectItem key={shift.id} value={shift.id.toString()}>
                                                            {shift.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage>{field.state.meta.errors.join(', ')}</FormMessage>
                                    </FormItem>
                                )}
                            </form.Field>

                            <div>
                                <FormLabel>Subjects</FormLabel>
                                <div className="mt-2 space-y-2">
                                    {subjects.map((_, index) => (
                                        <form.Field key={`subject-${index}`} name={`subjects[${index}]`}>
                                            {(field) => (
                                                <div className="flex items-center gap-2">
                                                    <FormControl>
                                                        <Input
                                                            name={field.name}
                                                            value={field.state.value || ''}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            placeholder={`Subject ${index + 1}`}
                                                        />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        onClick={() => removeSubject(index)}
                                                        disabled={subjects.length === 1}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )}
                                        </form.Field>
                                    ))}
                                </div>
                                <div className="mt-2">
                                    <Button type="button" variant="outline" onClick={addSubject}>
                                        Add Subject
                                    </Button>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={handleBack}>
                                    Back
                                </Button>
                                <Button type="submit" disabled={form.state.isSubmitting}>
                                    {form.state.isSubmitting ? 'Saving...' : isEdit ? 'Update Combination' : 'Save Combination'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
