import { HTMLAttributes } from 'react';
import GcsLogoSvg from '@/assets/Logo.svg';

export default function AppLogoIcon(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props}>
            <img src={GcsLogoSvg} alt="GCS Logo" />
        </div>
    );
}