import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ExaminationResult, ProgramGroup } from '@/types/database';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    programGroup: ProgramGroup;
    examinationResults: ExaminationResult[];
    assignedResults: number[];
}

export default function ExaminationResults({ programGroup, examinationResults, assignedResults }: Props) {
    const [selectedResults, setSelectedResults] = useState<number[]>(assignedResults);

    const handleSubmit = async () => {
        try {
            await router.post(route('program-groups.assign-examination-results', programGroup.id), {
                examination_results: selectedResults,
            });
        } catch (error) {
            console.error('Error assigning examination results:', error);
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Program Groups',
            href: route('program-groups.index'),
        },
        {
            title: programGroup.name,
            href: route('program-groups.edit', programGroup.id),
        },
        {
            title: 'Examination Results',
            href: route('program-groups.examination-results', programGroup.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${programGroup.name} - Examination Results`} />

            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Assign Examination Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-muted-foreground text-sm">Select the examination results that are required for this program group.</p>

                            <div className="space-y-2">
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

                            <div className="flex justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={() => router.visit(route('program-groups.edit', programGroup.id))}>
                                    Back
                                </Button>
                                <Button type="button" onClick={handleSubmit}>
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
