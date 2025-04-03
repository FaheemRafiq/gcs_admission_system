import { Check, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { FormStatus } from "@/types/database";

interface StatusDropdownProps {
    formNo: string;
    status: FormStatus;
}

export default function StatusDropdown({ formNo, status }: StatusDropdownProps) {
    const [currentStatus, setCurrentStatus] = useState(status);

    const statusVariants = {
        pending: "bg-yellow-500 text-white",
        approved: "bg-green-500 text-white",
        rejected: "bg-red-500 text-white",
    };

    const updateStatus = (newStatus: "approved" | "rejected") => {
        setCurrentStatus(newStatus);
        router.post(
            route("admission-form.update-status", { id: formNo, status: newStatus }),
            {},
            { preserveScroll: true }
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 p-1 rounded-lg border">
                    <Badge className={`capitalize text-sm ${statusVariants[currentStatus]}`}>{currentStatus}</Badge>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44 p-2 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                {(currentStatus === "pending" || currentStatus === "rejected") && (
                    <DropdownMenuItem
                        onSelect={() => updateStatus("approved")}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-green-600 hover:bg-green-100 dark:hover:bg-green-800 cursor-pointer"
                    >
                        <Check className="h-4 w-4" /> Approve
                    </DropdownMenuItem>
                )}
                {(currentStatus === "pending" || currentStatus === "approved") && (
                    <DropdownMenuItem
                        onSelect={() => updateStatus("rejected")}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-100 dark:hover:bg-red-800 cursor-pointer"
                    >
                        <X className="h-4 w-4" /> Reject
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
