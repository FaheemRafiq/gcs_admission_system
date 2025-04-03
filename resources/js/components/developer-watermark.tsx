import { cn } from '@/lib/utils';
import React from 'react';

interface DeveloperWatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

function DeveloperWatermark({ className = '', ...props }: DeveloperWatermarkProps) {
    return (
        <div className={cn('sm:text-center', className)} {...props}>
            <span className="text-sm text-gray-600">Crafted with</span>
            <span className="mx-1 animate-pulse text-lg">❤️</span>
            <span className="text-sm text-gray-600">by</span>
            <a
                href="https://github.com/FaheemRafiq"
                target="_blank"
                rel="noreferrer"
                className="mx-1 font-semibold text-purple-600 transition-colors duration-200 hover:text-purple-800 hover:underline"
            >
                Faheem
            </a>
        </div>
    );
}

export default DeveloperWatermark;
