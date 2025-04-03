import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { withForm } from '@/hooks/use-admission-form';
import { useAdmissionFormStore } from '@/store/AdmissionFormStore';
import { Program } from '@/types/database';
import { useStore } from '@tanstack/react-form';
import { BookOpen, Calendar, FileText, School } from 'lucide-react';
import React from 'react';
import { admissionFormOpts, type ExaminationRecord } from './shared-form';

const ExaminationDetailSection = withForm({
    ...admissionFormOpts,
    render: ({ form }) => {
        const selProgram = useStore(form.store, (state) => state.values.program_id);
        const examinationData = useStore(form.store, (state) => state.values.examination);
        const { program_groups: programGroups } = useAdmissionFormStore();

        // Find the selected program
        const selectedProgram = React.useMemo(() => {
            return programGroups
                .flatMap((group) => group.programs)
                .filter((program) => program !== undefined)
                .find((program: Program) => program.id.toString() === selProgram);
        }, [selProgram, programGroups]);

        // Dynamically set examination fields based on selected program's examination_results
        React.useEffect(() => {
            if (selectedProgram && (selectedProgram?.examination_results?.length ?? 0) > 0) {
                const requiredExaminations = selectedProgram?.examination_results?.map((result) => {
                    const existingExamination = examinationData.find((exam) => exam.name === result.title);
                    return {
                        name: result.title,
                        year: existingExamination?.year ?? '',
                        roll_no: existingExamination?.roll_no ?? '',
                        total_marks: existingExamination?.total_marks ?? '',
                        obtained_marks: existingExamination?.obtained_marks ?? '',
                        subjects: existingExamination?.subjects ?? '',
                        board_university: existingExamination?.board_university ?? '',
                        school_college: existingExamination?.school_college ?? '',
                    };
                });

                form.setFieldValue('examination', ((requiredExaminations?.length ?? 0) > 0 ? requiredExaminations : []) as ExaminationRecord[]);
            } else if (!selectedProgram && form.state.values.examination.length > 0) {
                // Reset examination if no program is selected
                form.setFieldValue('examination', []);
            }
        }, [selectedProgram]);

        return (
            <div className="border-border border-t pt-6">
                <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
                    <span className="bg-cyan-foreground text-secondary-foreground mr-2 flex h-8 w-8 items-center justify-center rounded-full text-sm">
                        3
                    </span>
                    Examination Details
                </h2>
                <p className="mb-4 text-sm text-gray-600">Provide details of your previous examinations based on the selected program</p>
                <div className="space-y-6">
                    {examinationData.length === 0 ? (
                        <p className="text-sm text-gray-500">Please select a program to display required examination details.</p>
                    ) : (
                        examinationData.map((exam, index) => (
                            <div key={index} className="rounded-md border border-gray-200 bg-gray-50 p-4">
                                <h3 className="mb-3 flex items-center text-lg font-medium text-gray-700">
                                    <School className="mr-1 h-4 w-4" /> {exam.name}
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-1">
                                        <Label htmlFor={`examination[${index}].year`} className="flex items-center text-sm text-gray-500" required>
                                            <Calendar className="mr-1 h-4 w-4" /> Year
                                        </Label>
                                        <form.Field
                                            name={`examination[${index}].year`}
                                            validators={{
                                                onChange: ({ value }) => {
                                                    const currentYear = new Date().getFullYear();
                                                    const minYear = 1950;

                                                    if (!/^\d{1,4}$/.test(value)) {
                                                        return 'Please enter a valid year';
                                                    }

                                                    const year = parseInt(value, 10);

                                                    if (value.length > 4) {
                                                        return 'Year should be a 4-digit number';
                                                    }

                                                    if (year > currentYear) {
                                                        return `Year cannot be greater than ${currentYear}`;
                                                    }

                                                    if (value.length === 4 && year < minYear) {
                                                        return `Year cannot be less than ${minYear}`;
                                                    }
                                                },
                                            }}
                                        >
                                            {(field) => (
                                                <Input
                                                    id={`examination[${index}].year`}
                                                    type="text"
                                                    placeholder="i.e. 2022"
                                                    value={field.state.value as string}
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        field.setValue(value.replace(/\D/g, ''));
                                                    }}
                                                    className="h-10"
                                                    isError={Boolean(form.state.fieldMeta?.[`examination[${index}].year`]?.errors?.[0])}
                                                    required
                                                />
                                            )}
                                        </form.Field>
                                        <InputError message={form.state.fieldMeta?.[`examination[${index}].year`]?.errors?.[0]} className="mt-1" />
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor={`examination[${index}].roll_no`} className="flex items-center text-sm text-gray-500" required>
                                            <FileText className="mr-1 h-4 w-4" /> Roll No.
                                        </Label>
                                        <form.Field name={`examination[${index}].roll_no`}>
                                            {(field) => (
                                                <Input
                                                    id={`examination[${index}].roll_no`}
                                                    placeholder="i.e. 142824"
                                                    type="text"
                                                    value={field.state.value as string}
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        field.setValue(value.replace(/\D/g, ''));
                                                    }}
                                                    className="h-10"
                                                    isError={Boolean(form.state.fieldMeta?.[`examination[${index}].roll_no`]?.errors?.[0])}
                                                    required
                                                />
                                            )}
                                        </form.Field>
                                        <InputError message={form.state.fieldMeta?.[`examination[${index}].roll_no`]?.errors?.[0]} className="mt-1" />
                                    </div>

                                    <div className="space-y-1">
                                        <Label
                                            htmlFor={`examination[${index}].total_marks`}
                                            className="flex items-center text-sm text-gray-500"
                                            required
                                        >
                                            <BookOpen className="mr-1 h-4 w-4" /> Total Marks
                                        </Label>
                                        <form.Field name={`examination[${index}].total_marks`}>
                                            {(field) => (
                                                <Input
                                                    id={`examination[${index}].total_marks`}
                                                    placeholder="i.e. 1100"
                                                    type="text"
                                                    value={field.state.value}
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        field.setValue(value.replace(/\D/g, ''));
                                                    }}
                                                    className="h-10"
                                                    isError={Boolean(form.state.fieldMeta?.[`examination[${index}].total_marks`]?.errors?.[0])}
                                                    required
                                                />
                                            )}
                                        </form.Field>
                                        <InputError
                                            message={form.state.fieldMeta?.[`examination[${index}].total_marks`]?.errors?.[0]}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label
                                            htmlFor={`examination[${index}].obtained_marks`}
                                            className="flex items-center text-sm text-gray-500"
                                            required
                                        >
                                            <BookOpen className="mr-1 h-4 w-4" /> Obtain Marks
                                        </Label>
                                        <form.Field
                                            name={`examination[${index}].obtained_marks`}
                                            validators={{
                                                onChangeListenTo: [`examination[${index}].total_marks`],
                                                onChange: ({ value, fieldApi }) => {
                                                    const total_marks = fieldApi.form.getFieldValue(`examination[${index}].total_marks`);
                                                    if (value && total_marks && parseInt(value) > parseInt(total_marks)) {
                                                        return 'Obtain marks cannot be greater than total marks';
                                                    }
                                                },
                                            }}
                                        >
                                            {(field) => (
                                                <Input
                                                    id={`examination[${index}].obtained_marks`}
                                                    placeholder="i.e. 999"
                                                    type="text"
                                                    value={field.state.value}
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        field.setValue(value.replace(/\D/g, ''));
                                                    }}
                                                    className="h-10"
                                                    isError={Boolean(form.state.fieldMeta?.[`examination[${index}].obtained_marks`]?.errors?.[0])}
                                                    required
                                                />
                                            )}
                                        </form.Field>
                                        <InputError
                                            message={form.state.fieldMeta?.[`examination[${index}].obtained_marks`]?.errors?.[0]}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="space-y-1 lg:col-span-2">
                                        <Label
                                            htmlFor={`examination[${index}].subjects`}
                                            className="flex items-center text-sm text-gray-500"
                                            required
                                        >
                                            <BookOpen className="mr-1 h-4 w-4" /> Subjects
                                        </Label>
                                        <form.Field name={`examination[${index}].subjects`}>
                                            {(field) => (
                                                <Input
                                                    id={`examination[${index}].subjects`}
                                                    placeholder="i.e. Physics, Chemistry, Biology"
                                                    value={field.state.value as string}
                                                    onChange={(e) => field.setValue(e.target.value)}
                                                    className="h-10"
                                                    required
                                                />
                                            )}
                                        </form.Field>
                                        <InputError
                                            message={form.state.fieldMeta?.[`examination[${index}].subjects`]?.errors?.[0]}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label
                                            htmlFor={`examination[${index}].board_university`}
                                            className="flex items-center text-sm text-gray-500"
                                            required
                                        >
                                            <School className="mr-1 h-4 w-4" /> Board/University
                                        </Label>
                                        <form.Field name={`examination[${index}].board_university`}>
                                            {(field) => (
                                                <Input
                                                    id={`examination[${index}].board_university`}
                                                    placeholder="i.e. BISE Lahore"
                                                    value={field.state.value as string}
                                                    onChange={(e) => field.setValue(e.target.value)}
                                                    className="h-10"
                                                    required
                                                />
                                            )}
                                        </form.Field>
                                        <InputError
                                            message={form.state.fieldMeta?.[`examination[${index}].board_university`]?.errors?.[0]}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="space-y-1 lg:col-span-2">
                                        <Label
                                            htmlFor={`examination[${index}].school_college`}
                                            className="flex items-center text-sm text-gray-500"
                                            required
                                        >
                                            <School className="mr-1 h-4 w-4" /> School/College
                                        </Label>
                                        <form.Field name={`examination[${index}].school_college`}>
                                            {(field) => (
                                                <Input
                                                    id={`examination[${index}].school_college`}
                                                    placeholder="i.e. Govt. College Lahore"
                                                    value={field.state.value as string}
                                                    onChange={(e) => field.setValue(e.target.value)}
                                                    className="h-10"
                                                    required
                                                />
                                            )}
                                        </form.Field>
                                        <InputError
                                            message={form.state.fieldMeta?.[`examination[${index}].school_college`]?.errors?.[0]}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    },
});

export default ExaminationDetailSection;
