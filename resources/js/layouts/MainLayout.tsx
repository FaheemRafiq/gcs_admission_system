import { CityProvider } from '@/contexts/CityContext';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function MainLayout({ children, ...props } : Props){
    const { flash } = usePage<SharedData>().props;

    useEffect(() => { 
        if (flash.success) {
            toast.success(flash.success);
        }    

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <CityProvider>
            <div className='flex min-h-screen w-full flex-col' {...props}>
                {children}

                <Toaster position='top-center' />
            </div>
        </CityProvider>
    )
};
