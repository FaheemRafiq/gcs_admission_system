import React from 'react';
import GcsLogoSvg from '@/assets/Logo.svg';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useAdmissionFormState, useAdmissionFormDispatch } from '@/contexts/AdmissionFormContext';

const HeaderSection: React.FC = () => {
    const { formData: data, errors } = useAdmissionFormState();
    const dispatch = useAdmissionFormDispatch();

    return (
        < div className="flex flex-col items-center justify-center" >
            <div className="flex flex-col lg:flex-row items-center justify-between w-full mb-4">
                {/* Logo and College Details */}
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-4 lg:mb-0">
                    <img src={GcsLogoSvg} alt="College Logo" className="h-20 sm:h-24 mb-4 sm:mb-0 sm:mr-4" />
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Government Graduate College of Science</h1>
                        <h2 className="text-lg sm:text-xl text-gray-700">گورنمنٹ گریجوایٹ کالج آف سائنس</h2>
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
                        <p className="mt-2 text-sm font-semibold text-gray-800 border rounded-full border-gray-300 px-4 py-1 inline-block">
                            APPLICATION FOR ADMISSION - {new Date().getFullYear()}
                        </p>
                    </div>
                </div>

                {/* Photo Upload */}
                <div
                    className={cn(
                        "relative w-32 h-40 sm:w-36 sm:h-44 border border-gray-300 rounded-md flex flex-col items-center justify-center shrink-0 cursor-pointer transition hover:border-blue-500 hover:bg-blue-50",
                        { 'border-destructive text-destructive': errors.photo }
                    )}
                >
                    {data.photo ? (
                        <img
                            src={URL.createObjectURL(data.photo)}
                            alt="Uploaded Photo"
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <div className="text-center text-gray-600 px-2 flex flex-col items-center">
                            <span className="text-2xl">📷</span>
                            <p className="text-xs">Click to upload a recent photograph (2" x 1.5") with a blue background</p>
                        </div>
                    )}
                    <input
                        id="photo-upload"
                        type="file"
                        accept="image/jpeg, image/jpg, image/png"
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const validTypes = ["image/jpeg", "image/jpg", "image/png"];
                            if (!validTypes.includes(file.type)) {
                                toast.error("Only JPG, JPEG, and PNG formats are allowed.");
                                return;
                            }

                            if (file.size > 2 * 1024 * 1024) {
                                toast.error("File size must be less than 2MB.");
                                return;
                            }

                            dispatch?.({
                                type: 'SET_FIELD',
                                payload: { key: 'photo', value: file }
                            });
                        }}
                        required
                    />
                </div>
            </div>
        </div >
    );
};

export default HeaderSection;
