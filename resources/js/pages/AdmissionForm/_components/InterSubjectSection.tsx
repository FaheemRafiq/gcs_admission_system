import React from 'react';
import { cn } from '@/lib/utils';
import { type InterSubject, setInterSubject, useAdmissionFormState } from '@/contexts/AdmissionFormContext';
import { Label } from '@/components/ui/label';
import { BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';

const InterSubjectSection: React.FC = () => {
    const { errors, interSubjects } = useAdmissionFormState();

    return (
        <div className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-cyan-foreground text-secondary-foreground flex items-center justify-center mr-2 text-sm">4</span>
                Subjects (For Intermediate Classes Only)
            </h2>
            <p className="text-sm text-gray-600 mb-4">Enter subjects if applying for an intermediate program.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {interSubjects.map((subject: InterSubject) => (
                    <div key={subject.id} className="flex items-center space-x-2">
                        <Label className="text-sm text-gray-500 flex items-center text-nowrap">
                            <BookOpen className="h-4 w-4 mr-1" /> Subject {subject.id}
                        </Label>
                        <Input
                            value={subject.name}
                            onChange={(e) => setInterSubject(subject.id, e.target.value)}
                            className={cn('h-10', {
                                'border-b border-border appearance-none focus:outline-0': !subject.readOnly,
                                'border-none focus:ring-0': subject.readOnly,
                            })}
                            placeholder={`Subject ${subject.id}`}
                            readOnly={subject.readOnly}
                        />
                    </div>
                ))}
            </div>
            {errors.inter_subjects && <p className="text-sm text-destructive mt-2">{errors.inter_subjects}</p>}
        </div>
    );
};

export default InterSubjectSection;
