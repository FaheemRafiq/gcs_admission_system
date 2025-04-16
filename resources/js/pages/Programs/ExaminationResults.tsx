import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import type { ExaminationResult, Program } from '@/types/database';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, FileText } from 'lucide-react';
import { useState } from 'react';

interface Props extends SharedData {
    program: Program;
    examinationResults: ExaminationResult[];
    assignedResults: number[];
}

export default function ExaminationResults({ program, examinationResults, assignedResults }: Props) {
    const [selectedResults, setSelectedResults] = useState<number[]>(assignedResults);

    const handleSubmit = () => {
        router.post(route('programs.assign-examination-results', program.id), {
            examination_results: selectedResults,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Programs',
            href: route('programs.index'),
        },
        {
            title: program.name,
            href: route('programs.edit', program.id),
        },
        {
            title: 'Examination Results',
            href: route('programs.examination-results', { program: 0 }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Assign Examination Results - ${program.name}`} />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Assign Examination Results</h1>
                    </div>
                    <Button asChild>
                        <Link href={route('programs.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Programs
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border p-6">
                    <h2 className="mb-4 text-lg font-medium">{program.program_full_name}</h2>

                    <div className="space-y-4">
                        {examinationResults.map((result) => (
                            <div key={result.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`result-${result.id}`}
                                    checked={selectedResults.includes(result.id)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setSelectedResults([...selectedResults, result.id]);
                                        } else {
                                            setSelectedResults(selectedResults.filter((id) => id !== result.id));
                                        }
                                    }}
                                />
                                <label
                                    htmlFor={`result-${result.id}`}
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {result.title}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button onClick={handleSubmit} disabled={selectedResults.length === 0}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
