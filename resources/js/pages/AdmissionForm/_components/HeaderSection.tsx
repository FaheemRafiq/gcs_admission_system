import React from 'react';
import GcsLogoSvg from '@/assets/Logo.svg';

const HeaderSection: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full px-4 pb-4">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full mb-2">
                {/* Left Side - Logo & English Text */}
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left w-full lg:w-1/2">
                    <img src={GcsLogoSvg} alt="College Logo" className="h-18 mb-4 sm:mb-0 sm:mr-4" />
                    <div className="flex-1">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                            Government Graduate College of Science
                        </h1>
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

                {/* Right Side - Urdu Text */}
                <div className="w-full lg:w-1/2 text-center lg:text-right mt-2 lg:mt-0">
                    <h2 className="text-lg sm:text-xl text-gray-700">گورنمنٹ گریجوایٹ کالج آف سائنس</h2>
                </div>
            </div>

            {/* Centered Admission Line */}
            <p className="mt-2 text-sm sm:text-base font-semibold text-gray-800 border rounded-full border-gray-300 px-4 py-1 text-center">
                APPLICATION FOR ADMISSION - {new Date().getFullYear()}
            </p>
        </div>

    );
};

export default HeaderSection;
