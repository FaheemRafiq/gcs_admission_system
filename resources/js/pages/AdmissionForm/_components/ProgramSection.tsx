import React, { Fragment, useId } from 'react';
import { Label } from '@/components/ui/label';
import { BookOpen, Clock } from 'lucide-react';
import { type SubjectCombination, type Program } from '@/types/database';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAdmissionFormStore } from '@/store/AdmissionFormStore';
import InputError from '@/components/input-error';

interface ProgramSectionProps {
    onValidityChange: (isValid: boolean) => void
}

const ProgramSection: React.FC<ProgramSectionProps> = ({ onValidityChange }) => {
    const { formData, errors, setField, program_groups: programGroups, shifts } = useAdmissionFormStore();

    const shiftGroupPrograms = React.useMemo(() => {
        return programGroups
            .map(group => ({
                ...group,
                programs: group.programs?.filter(program =>
                    program.shift_id === Number(formData.shift) || program.shift_id === null
                )
            }))
            .filter(group => (group?.programs?.length ?? 0) > 0);
    }, [programGroups, formData.shift]);

    const subjectCombinations = React.useMemo(() => {
        return shiftGroupPrograms
            .flatMap(pg => pg?.programs || [])
            .find(pg => pg.id === Number(formData.program))
            ?.subject_combinations || [];
    }, [shiftGroupPrograms, formData.program]);

    if (
        formData.shift === '' || 
        formData.program === '' || 
        ((subjectCombinations?.length ?? 0) !== 0 &&
        formData.subject_combination === '')
    ) {
        onValidityChange(false);
    } else {
        onValidityChange(true);
    }

    return (
        <div className='grid grid-cols-1 gap-y-4 gap-x-8'>
            <div className="space-y-1">
                <Label htmlFor='program' className='text-sm text-gray-500 flex items-center mb-1' required>
                    <Clock className="h-4 w-4 mr-1" /> Select Shift
                </Label>
                <Select defaultValue={formData.shift} onValueChange={value => setField('shift', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Shift" />
                    </SelectTrigger>
                    <SelectContent>
                        {shifts?.map(shift => (
                            <SelectItem value={shift.id.toString()} key={shift.id}>{shift.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.shift} className="mt-1" />
            </div>
            <div className="space-y-1">
                <Label htmlFor='program' className='text-sm text-gray-500 flex items-center mb-1' required>
                    <BookOpen className="h-4 w-4 mr-1" /> Select Program
                </Label>
                <Select
                    defaultValue={formData.program}
                    onValueChange={value => setField('program', value)}
                    disabled={formData.shift === ''}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Program">
                            {(() => {
                                const selectedProgram = shiftGroupPrograms
                                    .flatMap(group => group.programs?.map(program => ({ ...program, groupName: group.name })) || [])
                                    .find(program => program.id.toString() === formData.program);

                                return selectedProgram ? `${selectedProgram.groupName} ( ${selectedProgram.name} )` : "Select Program";
                            })()}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {shiftGroupPrograms.map(group => (
                            <SelectGroup key={group.id} className="relative">
                                <SelectLabel className="sticky top-0 z-10 bg-background text-foreground border-b border-border">
                                    {group.name}
                                </SelectLabel>
                                {group.programs?.map(program => (
                                    <SelectItem value={program.id.toString()} key={program.id}>
                                        {program.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        ))}
                    </SelectContent>
                </Select>

                <InputError message={errors.program} className="mt-1" />
            </div>
            {subjectCombinations.length > 0 && (
                <div className="space-y-1">
                    <Label htmlFor='program-combination' className='text-sm text-gray-500 flex items-center mb-1' required>
                        <BookOpen className="h-4 w-4 mr-1" /> Select Program Combination
                    </Label>
                    <Select defaultValue={formData.subject_combination} onValueChange={value => setField('subject_combination', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Subject's Combination" />
                        </SelectTrigger>
                        <SelectContent>
                            {subjectCombinations.map(combination => (
                                <SelectItem value={combination.id.toString()} key={combination.id}>{combination.subjects}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.program_combination} className="mt-1" />
                </div>
            )}
        </div>
    );
};

export default ProgramSection;
