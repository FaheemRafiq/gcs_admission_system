import { cva } from "class-variance-authority";
import { CircleAlertIcon } from "lucide-react";
import React, { ReactNode } from "react";

interface BoxSectionProps {
    title?: string;
    description?: string;
    className?: string;
    descriptionClassName?: string;
    errorMessage?: string;
    children: ReactNode;
}

const boxSection = cva("relative border border-black rounded-md p-2 mb-4 data-[error=true]:border-red-500", {
    variants: {
        size: {
            small: "p-2 text-sm",
            large: "p-6 text-lg",
        },
    },
});

const descriptionStyles = cva("text-gray-600 text-sm");

const BoxSection: React.FC<BoxSectionProps> = ({ title, description, children, className, descriptionClassName, errorMessage }) => {
    return (
        <div className={boxSection({ className })} data-error={errorMessage ? 'true' : 'false'}>
            {title && (
                <span className="absolute -top-3 left-3 bg-white px-2 text-sm font-semibold">
                    {title}
                </span>
            )}
            {description && (
                <span className="flex justify-between items-center mb-2">
                    <p className={descriptionStyles({ className: descriptionClassName })}>{description}</p>
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                </span>
            )}
            {!description && errorMessage ? <ErrorMessage message={errorMessage} /> : null}
            <div>{children}</div>
        </div>
    );
};

export default BoxSection;

function ErrorMessage({ message }: { message: string }) {
    return (
        <span className="flex items-center gap-1 text-red-500">
            <CircleAlertIcon size={16} />
            <p className="text-sm text-right">{message}</p>
        </span>
    );
}
