import type { BreadcrumbItem, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AppSidebarLayout from './app/app-sidebar-layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash, flash.error, flash.success]);

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
            {children}

            <Toaster position="top-center" />
        </AppSidebarLayout>
    );
};
