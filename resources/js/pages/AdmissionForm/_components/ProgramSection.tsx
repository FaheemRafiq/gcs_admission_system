import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { withForm } from '@/hooks/use-admission-form';
import { cn } from '@/lib/utils';
import { useAdmissionFormStore } from '@/store/AdmissionFormStore';
import { useStore } from '@tanstack/react-form';
import { BookOpen, Clock } from 'lucide-react';
import React from 'react';
import { admissionFormOpts } from './shared-form';

const ProgramSection = withForm({
    ...admissionFormOpts,
    render: ({ form }) => {
        const { program_groups: programGroups, shifts } = useAdmissionFormStore();
        const updatedShift = useStore(form.store, (state) => state.values.shift);
        const updatedProgram = useStore(form.store, (state) => state.values.program_id);

        const shiftGroupPrograms = React.useMemo(() => {
            return programGroups
                .map((group) => ({
                    ...group,
                    programs: group.programs?.filter((program) => program.shift_id === Number(updatedShift) || program.shift_id === null),
                }))
                .filter((group) => (group?.programs?.length ?? 0) > 0);
        }, [programGroups, updatedShift]);

        const subjectCombinations = React.useMemo(() => {
            return shiftGroupPrograms.flatMap((pg) => pg?.programs || []).find((pg) => pg.id === Number(updatedProgram))?.subject_combinations || [];
        }, [shiftGroupPrograms, updatedProgram]);

        return (
            <div className="border-border border-t pt-6">
                <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
                    <span
                        className={cn(
                            'bg-cyan-foreground text-secondary-foreground mr-2 flex h-8 w-8 items-center justify-center rounded-full text-sm',
                        )}
                    >
                        1
                    </span>
                    Program Selection
                </h2>
                <p className="mb-4 text-sm text-gray-600">Select your desired program and preferred shift</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="col-span-1 space-y-1" id="shift">
                        <Label htmlFor="shift" className="mb-1 flex items-center text-sm text-gray-500" required>
                            <Clock className="mr-1 h-4 w-4" /> Select Shift
                        </Label>
                        <form.Field name="shift">
                            {(field) => (
                                <Select value={field.state.value as string} onValueChange={(value) => field.setValue(value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Shift" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {shifts?.map((shift) => (
                                            <SelectItem value={shift.id.toString()} key={shift.id}>
                                                {shift.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </form.Field>
                        <InputError message={form.state.fieldMeta?.shift?.errors?.[0]} className="mt-1" />
                    </div>

                    <div className="col-span-1 space-y-1" id="program">
                        <Label htmlFor="program" className="mb-1 flex items-center text-sm text-gray-500" required>
                            <BookOpen className="mr-1 h-4 w-4" /> Select Program
                        </Label>
                        <form.Field name="program_id">
                            {(field) => (
                                <Select
                                    value={field.state.value as string}
                                    onValueChange={(value) => field.setValue(value)}
                                    disabled={updatedShift === ''}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Program">
                                            {(() => {
                                                const selectedProgram = shiftGroupPrograms
                                                    .flatMap(
                                                        (group) => group.programs?.map((program) => ({ ...program, groupName: group.name })) || [],
                                                    )
                                                    .find((program) => program.id.toString() === field.state.value);

                                                return selectedProgram ? `${selectedProgram.program_full_name}` : 'Select Program';
                                            })()}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {shiftGroupPrograms.map((group) => (
                                            <SelectGroup key={group.id} className="relative">
                                                <SelectLabel className="bg-background text-foreground border-border sticky top-0 z-10 border-b">
                                                    {group.name}
                                                </SelectLabel>
                                                {group.programs?.map((program) => (
                                                    <SelectItem value={program.id.toString()} key={program.id}>
                                                        {program.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </form.Field>
                        <InputError message={form.state.fieldMeta?.program_id?.errors?.[0]} className="mt-1" />
                    </div>

                    {subjectCombinations.length > 0 && (
                        <div className="col-span-1 space-y-1" id="subject_combination">
                            <Label htmlFor="subject_combination" className="mb-1 flex items-center text-sm text-gray-500" required>
                                <BookOpen className="mr-1 h-4 w-4" /> Select Program Combination
                            </Label>
                            <form.Field name="subject_combination">
                                {(field) => (
                                    <Select value={field.state.value as string} onValueChange={(value) => field.setValue(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Subject's Combination" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjectCombinations.map((combination) => (
                                                <SelectItem value={combination.id.toString()} key={combination.id}>
                                                    {combination.subjects}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </form.Field>
                            <InputError message={form.state.fieldMeta?.subject_combination?.errors?.[0]} className="mt-1" />
                        </div>
                    )}
                </div>
            </div>
        );
    },
});

export default ProgramSection;
