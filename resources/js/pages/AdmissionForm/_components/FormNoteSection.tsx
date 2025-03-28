import React from 'react';
import { AlertCircle } from 'lucide-react';

const FormNoteSection: React.FC = () => {

    return (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-md">
            <h3 className="text-lg font-semibold text-destructive/80 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" /> Important Notes:
            </h3>
            <ul className="list-disc list-inside text-destructive/90 text-sm">
                <li>
                    Once submitted, this form <strong>cannot be changed</strong>. Please review all details carefully.
                </li>
                <li>Ensure all information, including examination details and program selection, is accurate.</li>
                <li>Multiple submissions with the same CNIC, shift, and program combination are not allowed.</li>
                <li>The photo must have a solid blue background, be less than 2MB in size, and be in JPG, JPEG, or PNG format; otherwise, it will not be accepted.</li>
                <li>
                    Contact support at{' '}
                    <a href="mailto:gcswahdatroad@gmail.com" className="underline">
                        gcswahdatroad@gmail.com
                    </a>{' '}
                    if you need assistance.
                </li>
            </ul>
        </div>
    );
};

export default FormNoteSection;
