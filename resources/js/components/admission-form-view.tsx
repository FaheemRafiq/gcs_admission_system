import React, { Fragment, useEffect, useState } from 'react';
import { type AdmissionForm } from '@/types/database';
import { User } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    form: AdmissionForm;
}

const AdmissionFormView: React.FC<Props> = ({ form }) => {
    const { auth } = usePage().props as any; // Access auth from Inertia page props
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);

    // Parse inter_subjects if it's a string
    const interSubjects = typeof form.inter_subjects === 'string'
        ? JSON.parse(form.inter_subjects).filter(Boolean)
        : (Array.isArray(form.inter_subjects) ? form.inter_subjects.filter(Boolean) : []);

    // Format date strings properly
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (e) {
            return dateString; // Return as is if not parseable
        }
    };

    return (
        <Fragment>
            {/* Document Information */}
            <div className="bg-secondary text-secondary-foreground border border-border rounded-md p-3 sm:p-4 mb-6 print:border-none">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <p className="text-sm">Form Number: <span className="font-semibold">{form.form_no}</span></p>
                    <p className="text-sm">Submitted on: <span className="font-semibold">{formatDate(form.created_at)}</span></p>
                </div>
            </div>

            {/* Form Details */}
            <div className="space-y-8">
                {/* Basic Info */}
                <div className="border-t border-border pt-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-foreground flex items-center justify-center mr-2 text-sm flex-shrink-0">1</span>
                        <span>Applicant Information</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 sm:gap-x-8">
                        {/* Photo - Only show if authenticated */}
                        {auth.user && (
                            <div className="space-y-1 sm:col-span-2 lg:col-span-1 flex justify-center lg:justify-start">
                                <div
                                    className="w-32 h-40 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden cursor-pointer"
                                    onClick={() => form.photo_path && setIsPhotoOpen(true)}
                                >
                                    {form.photo_path ? (
                                        <img
                                            src={form.photo_path}
                                            alt="Applicant Photo"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <User className="h-8 w-8 mb-2" />
                                            <p className="text-xs text-center px-2">No Photo Available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Existing Fields */}
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium break-words">{form.name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Father's Name</p>
                            <p className="font-medium break-words">{form.father_name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">CNIC / Bay Form No.</p>
                            <p className="font-medium break-words">{form.cnic}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p className="font-medium break-words">{formatDate(form.dob)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="font-medium break-words">{form.email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Mobile Number</p>
                            <p className="font-medium break-words">{form.cell}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Religion</p>
                            <p className="font-medium break-words">{form.religion}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Domicile</p>
                            <p className="font-medium break-words">{form.domicile}</p>
                        </div>
                    </div>
                </div>

                {/* Program Info */}
                <div className="border-t border-border pt-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-foreground flex items-center justify-center mr-2 text-sm flex-shrink-0">2</span>
                        <span>Program Details</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 sm:gap-x-8">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Shift</p>
                            <p className="font-medium">{form.shift}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Program Category</p>
                            <p className="font-medium uppercase">{form.program_category === 'bs' ? 'Bachelor of Science' : form.program_category}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Selected Program</p>
                            <p className="font-medium break-words">{form.program_value}</p>
                        </div>

                        {interSubjects.length > 0 && (
                            <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                                <p className="text-sm text-gray-500">Intermediate Subjects</p>
                                <ul className="list-decimal list-inside font-medium space-y-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {interSubjects.map((subject: string, index: number) => (
                                        <li key={index} className="break-words">
                                            {subject}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Examinations */}
                {form.examinations && form.examinations.length > 0 && (
                    <div className="border-t border-border pt-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-foreground flex items-center justify-center mr-2 text-sm flex-shrink-0">3</span>
                            <span>Examination Details</span>
                        </h2>
                        <div className="space-y-6">
                            {form.examinations.sort((a, b) => a.name === 'Matric' ? -1 : (a.name === 'Intermediate' && b.name !== 'Matric') ? -1 : 1).map((exam, index) => (
                                <div key={exam.id || index} className="bg-secondary text-secondary-foreground border border-border rounded-md p-3 sm:p-4">
                                    <h3 className="text-lg font-medium mb-3">{exam.name}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 sm:gap-x-8">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Year</p>
                                            <p className="font-medium">{exam.year || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Roll Number</p>
                                            <p className="font-medium">{exam.roll_no || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Marks</p>
                                            <p className="font-medium">{exam.marks || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Percentage</p>
                                            <p className="font-medium">{exam.percentage ? `${exam.percentage}%` : 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Subjects</p>
                                            <p className="font-medium break-words">{exam.subjects || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Board/University</p>
                                            <p className="font-medium break-words">{exam.board_university || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">School/College</p>
                                            <p className="font-medium break-words">{exam.school_college || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contact Info */}
                <div className="border-t border-border pt-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-foreground flex items-center justify-center mr-2 text-sm flex-shrink-0">4</span>
                        <span>Contact Information</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 sm:gap-x-8">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Father's Mobile</p>
                            <p className="font-medium">{form.father_cell}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Father's CNIC</p>
                            <p className="font-medium">{form.father_cnic}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Father's Occupation</p>
                            <p className="font-medium break-words">{form.father_occupation}</p>
                        </div>

                        {form.guardian_name && (
                            <>
                                <div className="space-y-1 sm:col-span-2 lg:col-span-3 border-t border-border pt-4 mt-2">
                                    <p className="text-sm font-medium text-card-foreground/80">Guardian Information</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Guardian Name</p>
                                    <p className="font-medium break-words">{form.guardian_name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Guardian Mobile</p>
                                    <p className="font-medium">{form.guardian_cell || 'N/A'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Guardian Occupation</p>
                                    <p className="font-medium break-words">{form.guardian_occupation || 'N/A'}</p>
                                </div>
                            </>
                        )}

                        <div className="space-y-1 sm:col-span-3 lg:col-span-3 border-t border-border pt-4 mt-2">
                            <p className="text-sm font-medium text-card-foreground/80">Address Information</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Present Address</p>
                            <p className="font-medium break-words">{form.present_address}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Permanent Address</p>
                            <p className="font-medium break-words">{form.permanent_address}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-Screen Photo Modal */}
            <AnimatePresence>
                {isPhotoOpen && form.photo_path && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={() => setIsPhotoOpen(false)}
                    >
                        <motion.img
                            src={form.photo_path}
                            alt="Applicant Photo Full Screen"
                            className="max-w-[90vw] max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default AdmissionFormView;