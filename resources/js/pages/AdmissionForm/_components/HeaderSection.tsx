import GcsLogoSvg from '@/assets/Logo.svg';
import React from 'react';

const HeaderSection: React.FC = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center px-4 pb-4">
            <div className="flex w-full flex-col items-center justify-between lg:flex-row">
                {/* Left Side - Logo & English Text */}
                <div className="flex w-full flex-col items-center text-center sm:flex-row sm:text-left">
                    <img src={GcsLogoSvg} alt="College Logo" className="mb-4 h-18 sm:mr-4 sm:mb-0" />
                    <div className="flex-1">
                        <div className="flex flex-col justify-between gap-1 md:flex-row">
                            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">Government Graduate College of Science</h1>
                            <h2 className="text-lg text-gray-700 sm:text-xl">گورنمنٹ گریجوایٹ کالج آف سائنس</h2>
                        </div>
                        <p className="text-sm text-gray-600">
                            Wahdat Road, Lahore. (
                            <a
                                href="https://sites.google.com/gcslahore.edu.pk/ggcs/home"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                www.gcslahore.edu.pk
                            </a>
                            )
                        </p>
                    </div>
                </div>
            </div>

            {/* Centered Admission Line */}
            <p className="mt-2 rounded-full border border-gray-300 px-4 py-1 text-center text-sm font-semibold text-gray-800 sm:text-base">
                APPLICATION FOR ADMISSION - {new Date().getFullYear()}
            </p>
        </div>
    );
};

export default HeaderSection;
