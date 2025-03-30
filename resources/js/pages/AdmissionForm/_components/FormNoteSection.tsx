import React from 'react';
import { AlertCircle } from 'lucide-react';

const FormNoteSection: React.FC = () => {
    return (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-md">
            <h3 className="text-lg font-semibold text-destructive/80 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" /> Important Notice:
            </h3>
            <ul className="list-disc list-inside text-destructive/90 text-sm space-y-1 mt-2">
                <li>
                    Please review all details carefully before submission. <strong>Once submitted, the form cannot be modified.</strong>
                </li>
                <li>
                    Ensure the accuracy of all provided information, including examination details and program selection.
                </li>
                <li>
                    Duplicate applications with the same CNIC, shift, and program combination will not be accepted.
                </li>
                <li>
                    Your uploaded photo must meet the following requirements:
                    <ul className="list-disc pl-5 mt-1">
                        <li>Solid blue background</li>
                        <li>File size under 2MB</li>
                        <li>Format: JPG, JPEG, or PNG</li>
                    </ul>
                    <span className="block mt-1">Non-compliant photos will be rejected.</span>
                </li>
                <li>
                    For assistance, contact our support team at{' '}
                    <a href="mailto:gcswahdatroad@gmail.com" className="underline">
                        gcswahdatroad@gmail.com
                    </a>.
                </li>
            </ul>
        </div>
    );
};

export default FormNoteSection;
