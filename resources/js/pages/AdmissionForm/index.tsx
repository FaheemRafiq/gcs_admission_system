import React, { useEffect, useState } from 'react';
import { Loader2, ArrowRight, ArrowLeft, Save, CheckCircle2 } from 'lucide-react';

// Local
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import AdmissionFormLayout from '@/layouts/MainLayout';
import { type ProgramGroup, type Shift } from '@/types/database';
import { useAdmissionFormStore } from '@/store/AdmissionFormStore';
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperTrigger,
} from "@/components/ui/stepper";

// Native Components
import HeaderSection from './_components/HeaderSection';
import PersonalInfoSection from './_components/PersonalInfoSection';
import FormNoteSection from './_components/FormNoteSection';
import ExaminationDetailSection from './_components/ExaminationDetailSection';
import ProgramSection from './_components/ProgramSection';
import { cn } from '@/lib/utils';
import DeveloperWatermark from '@/components/developer-watermark';
import { Progress } from '@/components/ui/progress';

interface AdmissionFormProps {
    programGroups: ProgramGroup[];
    shifts: Shift[];
}

const AdmissionForm = ({ programGroups, shifts }: AdmissionFormProps) => {
    // Global
    const { formData, submitForm, processing, setShifts, setProgramGroups, sectionsCompleted, setSectionsCompleted } = useAdmissionFormStore();
    const { updateAppearance } = useAppearance();

    // Local
    const [currentStep, setCurrentStep] = useState(1);
    const [sectionValid, setSectionValid] = useState(false);

    // Handle section validity change
    const handleSectionValidityChange = (valid: boolean) => {
        setSectionValid(valid);
    };

    const STEPS = [
        {
            step: 1,
            title: 'Program Selection',
            description: 'Select your desired program and preferred shift',
            component: (
                <ProgramSection
                    onValidityChange={handleSectionValidityChange}
                />
            ),
            navigation: {
                back: false,
                next: 2
            }
        },
        {
            step: 2,
            title: 'Personal Information',
            description: 'Provide your personal and contact details',
            component: (
                <PersonalInfoSection
                    onValidityChange={handleSectionValidityChange}
                />
            ),
            navigation: {
                back: 1,
                next: 3
            }
        },
        {
            step: 3,
            title: 'Examination Details',
            description: 'Enter your academic qualifications and marks',
            component: (
                <ExaminationDetailSection
                />
            ),
            navigation: {
                back: 2,
                next: false
            }
        }
    ];

    // Handle next step
    const handleNext = () => {
        if (!sectionValid) return;

        if (!sectionsCompleted.includes(currentStep)) {
            setSectionsCompleted([...sectionsCompleted, currentStep]);
        }

        const nextStep = STEPS.find(step => step.step === currentStep)?.navigation.next;
        if (nextStep) {
            setCurrentStep(nextStep as number);
            setSectionValid(false);
        }
    };

    // Handle back step
    const handleBack = () => {
        const prevStep = STEPS.find(step => step.step === currentStep)?.navigation.back;
        if (prevStep) {
            setCurrentStep(prevStep as number);
        }
    };

    // Handle final submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Submit the complete form
        submitForm(e);
    };

    useEffect(() => {
        updateAppearance('light');
        setProgramGroups(programGroups);
        setShifts(shifts);
    }, []);

    return (
        <AdmissionFormLayout>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8 print:p-0 print:bg-white">
                <Head title="Admission Application Form" />
                <div className="max-w-7xl w-full h-full bg-card text-card-foreground shadow-xl rounded-xl p-6 sm:p-8 print:shadow-none print:p-4">
                    <HeaderSection />

                    {/* Progress Indicator */}
                    <div className="mb-8 border-t border-border">
                        {/* Step Indicators */}
                        <Stepper value={currentStep} className="gap-4 mt-6">
                            {STEPS.map((step) => {
                                const isCompleted = sectionsCompleted.includes(step.step);
                                const isActive = currentStep === step.step;
                                const isDisabled = !isCompleted && step.step > Math.max(...sectionsCompleted, currentStep);

                                return (
                                    <StepperItem key={step.step} step={step.step} className="flex-1">
                                        <StepperTrigger
                                            className={cn(
                                                "w-full flex flex-col items-center gap-2 relative",
                                                isDisabled && "pointer-events-none opacity-50"
                                            )}
                                        >
                                            <StepperIndicator
                                                className={cn(
                                                    "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium",
                                                    isCompleted
                                                        ? "bg-green-100 text-green-700 border-green-500"
                                                        : isActive
                                                            ? "bg-destructive text-destructive-foreground border-destructive"
                                                            : "bg-muted text-muted-foreground"
                                                )}
                                            >
                                                {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : step.step}
                                            </StepperIndicator>
                                            <div className="text-center">
                                                <p className="text-sm font-medium">{step.title}</p>
                                                <p className="text-xs text-muted-foreground hidden md:block">{step.description}</p>
                                            </div>
                                        </StepperTrigger>
                                    </StepperItem>
                                );
                            })}
                        </Stepper>

                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Current Section Content */}
                        <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
                            {STEPS.map((step) => {
                                if (step.step === currentStep) {
                                    return (
                                        <div key={step.step} className="space-y-6">
                                            <div className="border-b border-border pb-4">
                                                <h2 className="text-2xl font-semibold text-foreground">
                                                    {step.title}
                                                </h2>
                                                <p className="text-muted-foreground mt-1">{step.description}</p>
                                            </div>

                                            {/* Scrollable content area */}
                                            <div className="h-[calc(100vh-450px)] overflow-y-auto px-1 custom-scrollbar">
                                                {step.component}
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                            <DeveloperWatermark className="text-muted-foreground" />

                            <div className="flex gap-3">
                                {STEPS.find(step => step.step === currentStep)?.navigation.back && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleBack}
                                        className="gap-2"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back
                                    </Button>
                                )}

                                {STEPS.find(step => step.step === currentStep)?.navigation.next ? (
                                    <Button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!sectionValid}
                                        className="gap-2"
                                    >
                                        Next
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        disabled={processing || !sectionValid}
                                        className="gap-2"
                                    >
                                        {processing ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Save className="h-4 w-4" />
                                        )}
                                        Submit Application
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div className="mt-8 print:hidden">
                            <FormNoteSection />
                        </div>
                    </form>
                </div>
            </div>
        </AdmissionFormLayout>
    );
};

export default AdmissionForm;