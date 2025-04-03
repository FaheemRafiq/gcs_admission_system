import GcsLogoSvg from '@/assets/Logo.svg';
import { HTMLAttributes } from 'react';

export default function AppLogoIcon(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props}>
            <img src={GcsLogoSvg} alt="GCS Logo" />
        </div>
    );
}
