import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { AdmissionForm } from '@/types/database';
import { router } from '@inertiajs/react';
import { type Row } from '@tanstack/react-table';
import { CheckIcon, ChevronDownIcon, EyeIcon, XIcon } from 'lucide-react';

export const ActionMenu: React.FC<{ row: Row<AdmissionForm> }> = ({ row }) => {

    const updateStatus = (newStatus: "approved" | "rejected", formNo: number) => {
        router.post(
            route("admission-form.update-status", { id: formNo, status: newStatus }),
            {},
            { preserveScroll: true }
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    Actions <ChevronDownIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-lg border border-gray-200 shadow-lg dark:border-gray-700">
                <DropdownMenuItem
                    onSelect={() => router.get(route('admission-forms.show', { id: row.original.form_no }))}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <EyeIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    View Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {(row.original.status === 'pending' || row.original.status === 'rejected') && (
                    <DropdownMenuItem
                        onSelect={() => updateStatus('approved', row.original.form_no)}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-800"
                    >
                        <CheckIcon className="h-4 w-4" />
                        Approve
                    </DropdownMenuItem>
                )}

                {(row.original.status === 'pending' || row.original.status === 'approved') && (
                    <DropdownMenuItem
                        onSelect={() => updateStatus('rejected', row.original.form_no)}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800"
                    >
                        <XIcon className="h-4 w-4" />
                        Reject
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
