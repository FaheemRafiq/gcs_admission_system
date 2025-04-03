import { AlertCircle } from 'lucide-react';
import React from 'react';

const FormNoteSection: React.FC = () => {
    return (
        <div className="bg-destructive/10 border-destructive mb-6 rounded-md border p-4">
            <h3 className="text-destructive/80 flex items-center text-lg font-semibold">
                <AlertCircle className="mr-2 h-5 w-5" /> Important Notice:
            </h3>
            <ul className="text-destructive/90 mt-2 list-inside list-disc space-y-1 text-sm">
                <li>
                    Please review all details carefully before submission. <strong>Once submitted, the form cannot be modified.</strong>
                </li>
                <li>Ensure the accuracy of all provided information, including examination details and program selection.</li>
                <li>Duplicate applications with the same program will not be accepted.</li>
                <li>
                    Your uploaded photo must meet the following requirements:
                    <ul className="mt-1 list-disc pl-5">
                        <li>Solid blue background</li>
                        <li>File size under 2MB</li>
                        <li>Format: JPG, JPEG, or PNG</li>
                    </ul>
                    <span className="mt-1 block">Non-compliant photos will be rejected.</span>
                </li>
                <li>
                    For assistance, contact our support team at{' '}
                    <a href="mailto:gcswahdatroad@gmail.com" className="underline">
                        gcswahdatroad@gmail.com
                    </a>
                    .
                </li>
            </ul>
        </div>
    );
};

export default FormNoteSection;
