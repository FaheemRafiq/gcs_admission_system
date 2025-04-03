import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { withForm } from '@/hooks/use-admission-form';
import { useAdmissionFormStore } from '@/store/AdmissionFormStore';
import { Program } from '@/types/database';
import { useStore } from '@tanstack/react-form';
import { FileIcon } from 'lucide-react';
import React from 'react';
import { admissionFormOpts, type DocumentRequirement } from './shared-form';

const RequiredDocumentSection = withForm({
    ...admissionFormOpts,
    render: ({ form }) => {
        const selProgram = useStore(form.store, (state) => state.values.program_id);
        const documentsData = useStore(form.store, (state) => state.values.documents);
        const { program_groups: programGroups } = useAdmissionFormStore();

        // Find the selected program
        const selectedProgram = React.useMemo(() => {
            return programGroups
                .flatMap((group) => group.programs)
                .filter((program) => program !== undefined)
                .find((program: Program) => program.id.toString() === selProgram);
        }, [selProgram, programGroups]);

        // Dynamically set documents fields based on selected program's document_requirements
        React.useEffect(() => {
            if (selectedProgram && (selectedProgram?.document_requirements?.length ?? 0) > 0) {
                const requiredDocuments = selectedProgram?.document_requirements?.map((documentReq) => {
                    const documentData = documentsData.find((item) => item.key === documentReq.document?.document_key);
                    return {
                        key: documentReq.document?.document_key,
                        name: documentReq.document?.name,
                        is_required: documentReq.is_required ?? false,
                        value: documentData?.value ?? null,
                    };
                });

                if (JSON.stringify(requiredDocuments) !== JSON.stringify(documentsData)) {
                    form.setFieldValue('documents', ((requiredDocuments?.length ?? 0) > 0 ? requiredDocuments : []) as DocumentRequirement[]);
                }
            } else if (documentsData.length > 0) {
                form.setFieldValue('documents', []);
            }
        }, [selectedProgram]);

        if (documentsData.length === 0) {
            return <></>;
        }

        return (
            <div className="border-border border-t pt-6">
                <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
                    <span className="bg-cyan-foreground text-secondary-foreground mr-2 flex h-8 w-8 items-center justify-center rounded-full text-sm">
                        4
                    </span>
                    Required Documents
                </h2>
                <p className="mb-4 text-sm text-gray-600">Provide the required documents for the selected program</p>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {documentsData.map((document, index) => (
                            <div key={document.key} className="space-y-1">
                                <Label
                                    htmlFor={`documents[${index}].value`}
                                    className="flex items-center text-sm text-gray-500"
                                    required={Boolean(document.is_required)}
                                >
                                    <FileIcon className="mr-1 h-4 w-4" /> {document.name}
                                </Label>
                                <form.Field name={`documents[${index}].value`}>
                                    {(field) => (
                                        <>
                                            <Input
                                                type="file"
                                                name={`documents[${index}].value`}
                                                id={`documents[${index}].value`}
                                                accept="application/pdf"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        field.setValue(file);
                                                    }
                                                }}
                                                className="h-10"
                                                isError={Boolean(form.state.errors.length)}
                                                required={Boolean(document.is_required)}
                                            />
                                            <InputError message={form.state.errors.length > 0 ? form.state.errors[0] : ''} />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
});

export default RequiredDocumentSection;
