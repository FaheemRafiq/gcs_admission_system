import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface ConfirmationDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string | ReactNode;
    description: string | ReactNode;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}

export function ConfirmationDialog({
    open,
    setOpen,
    title,
    description,
    onConfirm,
    confirmText = 'Delete',
    cancelText = 'Cancel',
}: ConfirmationDialogProps) {
    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        {cancelText}
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm}>
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
