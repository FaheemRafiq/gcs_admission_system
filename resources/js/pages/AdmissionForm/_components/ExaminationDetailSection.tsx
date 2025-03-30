import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    School,
    BookOpen,
    Calendar,
    FileText,
    Percent,
} from 'lucide-react';
import { type ExaminationRecord, useAdmissionFormStore } from '@/store/AdmissionFormStore';

const ExaminationLevels = [
    { key: 'matric', label: 'Matric (Arts/Science)' },
    { key: 'intermediate', label: 'Intermediate (Arts/Science)' },
    { key: 'associate', label: 'Associate Degree (Arts/Science)' },
];

const ExaminationDetailSection: React.FC = () => {
    const { examinationData, setExamination } = useAdmissionFormStore();

    return (
        <div className="space-y-6">
            {ExaminationLevels.map((level) => {
                const levelKey = level.key as keyof typeof examinationData;
                const LevelData = examinationData[levelKey] as ExaminationRecord;
                return (
                    <div key={levelKey} className="bg-gray-50 border border-gray-200 rounded-md p-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                            <School className="h-4 w-4 mr-1" /> {level.label}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                            <div className="space-y-1">
                                <Label htmlFor={`${levelKey}_year`} className="text-sm text-gray-500 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" /> Year
                                </Label>
                                <Input
                                    id={`${levelKey}_year`}
                                    min={new Date().getFullYear() - 50}
                                    max={new Date().getFullYear()}
                                    type="number"
                                    placeholder='i.e. 2022'
                                    value={LevelData.year}
                                    onChange={(e) =>
                                        setExamination(levelKey, 'year', e.target.value)
                                    }
                                    className="h-10"
                                    hideCaret
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={`${levelKey}_roll_no`} className="text-sm text-secondary-foreground/50 flex items-center">
                                    <FileText className="h-4 w-4 mr-1" /> Roll No.
                                </Label>
                                <Input
                                    id={`${levelKey}_roll_no`}
                                    name={`${levelKey}_roll_no`}
                                    placeholder='i.e. 142824'
                                    value={LevelData.roll_no}
                                    type='number'
                                    onChange={(e) =>
                                        setExamination(levelKey, 'roll_no', e.target.value)
                                    }
                                    className="h-10"
                                    hideCaret
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={`${levelKey}_marks`} className="text-sm text-secondary-foreground/50 flex items-center">
                                    <BookOpen className="h-4 w-4 mr-1" /> Marks
                                </Label>
                                <Input
                                    id={`${levelKey}_marks`}
                                    min={100}
                                    max={5000}
                                    placeholder='i.e. 999'
                                    type="number"
                                    value={LevelData.marks}
                                    onChange={(e) =>
                                        setExamination(levelKey, 'marks', e.target.value)
                                    }
                                    className="h-10"
                                    hideCaret
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={`${levelKey}_percentage`} className="text-sm text-secondary-foreground/50 flex items-center">
                                    <Percent className="h-4 w-4 mr-1" /> Percentage
                                </Label>
                                <Input
                                    id={`${levelKey}_percentage`}
                                    min={1}
                                    max={100}
                                    placeholder='i.e. 90.81'
                                    step="0.1"
                                    type="number"
                                    value={LevelData.percentage}
                                    onChange={(e) =>
                                        setExamination(levelKey, 'percentage', e.target.value)
                                    }
                                    className="h-10"
                                    hideCaret
                                />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <Label htmlFor={`${levelKey}_subjects`} className="text-sm text-secondary-foreground/50 flex items-center">
                                    <BookOpen className="h-4 w-4 mr-1" /> Subjects
                                </Label>
                                <Input
                                    id={`${levelKey}_subjects`}
                                    placeholder='i.e. Physics, Chemistry, Biology'
                                    value={LevelData.subjects}
                                    onChange={(e) =>
                                        setExamination(levelKey, 'subjects', e.target.value)
                                    }
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={`${levelKey}_board_university`} className="text-sm text-secondary-foreground/50 flex items-center">
                                    <School className="h-4 w-4 mr-1" /> Board/University
                                </Label>
                                <Input
                                    id={`${levelKey}_board_university`}
                                    value={LevelData.board_university}
                                    placeholder='i.e. BISE Lahore'
                                    onChange={(e) =>
                                        setExamination(levelKey, 'board_university', e.target.value)
                                    }
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={`${levelKey}_school_college`} className="text-sm text-secondary-foreground/50 flex items-center">
                                    <School className="h-4 w-4 mr-1" /> School/College
                                </Label>
                                <Input
                                    id={`${levelKey}_school_college`}
                                    value={LevelData.school_college}
                                    placeholder='i.e. Govt. College Lahore'
                                    onChange={(e) =>
                                        setExamination(levelKey, 'school_college', e.target.value)
                                    }
                                    className="h-10"
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExaminationDetailSection;
