import { cn } from '@/lib/utils';
import React from 'react'

interface DeveloperWatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

function DeveloperWatermark({ className = '', ...props }: DeveloperWatermarkProps) {
    return (
        <div className={cn("text-center", className)} {...props}>
            <span className="text-sm text-gray-600">Crafted with</span>
            <span className="text-lg mx-1 animate-pulse">❤️</span>
            <span className="text-sm text-gray-600">by</span>
            <a
                href="https://github.com/FaheemRafiq"
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 hover:text-purple-800 hover:underline font-semibold mx-1 transition-colors duration-200"
            >
                Faheem
            </a>
        </div>
    )
}

export default DeveloperWatermark;
