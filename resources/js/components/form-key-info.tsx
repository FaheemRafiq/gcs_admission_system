import { CopyIcon, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FormKeyProps {
    formKey: string;
    auth: boolean;
}

export default function FormKeyInfo({ formKey, auth }: FormKeyProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(formKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center rounded-lg">
            <p className="text-sm">Form No: <strong>{formKey}</strong></p>
            {auth === false && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Info className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="p-3 text-sm">
                        <p className="mb-2">Keep this form number safe. You'll need it to track or download your admission form later.</p>
                        <div className="flex items-center gap-2">
                            <span className="font-mono font-bold">{formKey}</span>
                            <>
                                <CopyIcon className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-700" onClick={handleCopy} /> {copied ? "Copied!" : "Copy"}
                            </>
                        </div>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}
