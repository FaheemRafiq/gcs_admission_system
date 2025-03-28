import React from 'react';
import { cn } from '@/lib/utils';
import { useAdmissionFormState, useAdmissionFormDispatch } from '@/contexts/AdmissionFormContext';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock } from 'lucide-react';

const ShiftSection: React.FC<{ shifts: string[]}> = ({ shifts }) => {
    const { formData: data, errors } = useAdmissionFormState();
    const dispatch = useAdmissionFormDispatch();

    return (
        <div className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className={cn("w-8 h-8 rounded-full bg-cyan-foreground text-secondary-foreground flex items-center justify-center mr-2 text-sm", { 'bg-red-100 text-red-600': errors.shift })}>1</span>
                Shift Selection
            </h2>
            <p className="text-sm text-gray-600 mb-4">Select your preferred shift.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shifts.map((shift) => (
                    <Label htmlFor={`shift_${shift}`} key={shift} className="flex items-center space-x-2">
                        <Checkbox
                            id={`shift_${shift}`}
                            checked={data.shift === shift}
                            onCheckedChange={(checked) => dispatch?.({
                                type: 'SET_FIELD',
                                payload: { key: 'shift', value: checked ? shift : '' }
                            })}
                        />
                        <span className="text-sm font-medium flex items-center">
                            <Clock className="h-4 w-4 mr-1" /> {shift}
                        </span>
                    </Label>
                ))}
            </div>
            {errors.shift && <p className="text-sm text-destructive mt-2">{errors.shift}</p>}
        </div>
    );
};

export default ShiftSection;
