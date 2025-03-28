import React from 'react';
import { cn } from '@/lib/utils';
import { setProgram, useAdmissionFormState } from '@/contexts/AdmissionFormContext';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen } from 'lucide-react';
import { type ProgramGroup } from '..';

const ProgramSection: React.FC<{ programGroups: ProgramGroup[] }> = ({ programGroups }) => {
    const { formData: data, errors } = useAdmissionFormState();

    return (
        <div className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className={cn("w-8 h-8 rounded-full bg-cyan-foreground text-secondary-foreground flex items-center justify-center mr-2 text-sm", { 'bg-red-100 text-red-600': errors.program_category || errors.program_value })}>2</span>
                Program Selection
            </h2>
            <p className="text-sm text-destructive mb-4">
                Please select only one program. Submit a separate form for each additional program.
            </p>
            <div className="space-y-6">
                {programGroups.map((group) => (
                    <div key={group.label}>
                        <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" /> {group.label}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {group.options.map((degree) => (
                                <Label htmlFor={`${group.category}_${degree}`} key={degree} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`${group.category}_${degree}`}
                                        checked={data.program_category === group.category && data.program_value === degree}
                                        onCheckedChange={(checked) => setProgram(group.category, degree, Boolean(checked))}
                                    />
                                    <span className="text-sm font-medium">{degree}</span>
                                </Label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {(errors.program_category || errors.program_value) && (
                <p className="text-sm text-destructive mt-2">{errors.program_category || errors.program_value}</p>
            )}
        </div>
    );
};

export default ProgramSection;
