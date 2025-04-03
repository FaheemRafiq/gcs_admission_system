import { IdCardIcon } from 'lucide-react';
import React from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface CNICInputProps {
    value: string;
    onChange: (value: string) => void;
    setError?: (error: string) => void;
    placeholder?: string;
    className?: string;
    inputId?: string;
    isError?: string | boolean | undefined;
}

const CNICInput: React.FC<CNICInputProps> = ({
    value,
    onChange,
    setError,
    placeholder = 'i.e XXXXX-XXXXXXX-X',
    className,
    inputId = 'cnic',
    isError,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        // Remove all non-numeric characters (including any existing hyphens)
        const numericValue = inputValue.replace(/[^0-9]/g, '');

        // Format according to Pakistan CNIC/B-Form format
        let formattedValue = '';

        if (numericValue.length <= 5) {
            // Just the first part
            formattedValue = numericValue;
        } else if (numericValue.length <= 12) {
            // First and second part
            formattedValue = `${numericValue.slice(0, 5)}-${numericValue.slice(5)}`;
        } else {
            // Complete CNIC with all three parts
            formattedValue = `${numericValue.slice(0, 5)}-${numericValue.slice(5, 12)}-${numericValue.slice(12, 13)}`;
        }

        onChange(formattedValue);

        // Validate format: XXXXX-XXXXXXX-X
        if (setError) {
            if (/^\d{5}-\d{7}-\d{1}$/.test(formattedValue) || formattedValue === '') {
                setError(''); // Valid format or empty
            } else if (numericValue.length > 0 && numericValue.length < 13) {
                setError('Please enter a complete 13-digit CNIC number.');
            } else if (numericValue.length > 13) {
                setError('CNIC number cannot exceed 13 digits.');
            } else {
                setError('');
            }
        }
    };

    return (
        <div className="relative">
            <Input
                id={inputId}
                className={cn('peer w-full border p-2 ps-9', className)}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                isError={isError}
                required
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <IdCardIcon size={16} strokeWidth={2} aria-hidden="true" />
            </div>
        </div>
    );
};

export { CNICInput };
