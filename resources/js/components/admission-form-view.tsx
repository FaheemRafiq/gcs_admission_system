import { formatDate, formatInto } from '@/lib/dates';
import { type SharedData } from '@/types';
import { type AdmissionForm } from '@/types/database';
import { Link, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { EyeIcon, User } from 'lucide-react';
import React, { Fragment, useState } from 'react';
import FormKeyInfo from './form-key-info';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface Props {
    form: AdmissionForm;
}

const AdmissionFormView: React.FC<Props> = ({ form }) => {
    const { auth } = usePage<SharedData>().props; // Access auth from Inertia page props
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);

    return (
        <Fragment>
            {/* Document Information */}
            <div className="bg-secondary text-secondary-foreground border-border mb-6 rounded-md border p-3 sm:p-4 print:border-none">
                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                    <FormKeyInfo formKey={form.form_key} auth={Boolean(auth.user)} />
                    <p className="text-sm">
                        Submitted on: <span className="font-semibold">{formatDate(form.created_at, 'informal', 'datetime')}</span>
                    </p>
                </div>
            </div>

            {/* Form Details */}
            <div className="space-y-8">
                {/* Basic Info */}
                <div className="border-border border-t pt-6">
                    <h2 className="mb-4 flex items-center text-xl font-semibold">
                        <span className="bg-cyan-foreground mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8">
                            1
                        </span>
                        <span>Applicant Information</span>
                    </h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
                        {/* Photo - Only show if authenticated */}
                        <div className="flex justify-center space-y-1 sm:col-span-2 lg:col-span-1 lg:justify-start">
                            <div
                                className="flex h-40 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-300"
                                onClick={() => auth.user && form.photo_path && setIsPhotoOpen(true)}
                            >
                                {form.photo_path ? (
                                    <img src={form.photo_path} alt="Applicant Photo" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <User className="mb-2 h-8 w-8" />
                                        <p className="px-2 text-center text-xs">No Photo Available</p>
                                    </div>
                                )}
                            </div>
                        </div>

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
                            <p className="font-medium break-words">{formatInto(form.dob, 'd-m-Y')}</p>
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
                <div className="border-border border-t pt-6">
                    <h2 className="mb-4 flex items-center text-xl font-semibold">
                        <span className="bg-cyan-foreground mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8">
                            2
                        </span>
                        <span>Program Details</span>
                    </h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Shift</p>
                            <p className="font-medium">{form.shift}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Program</p>
                            <p className="font-medium">{form.program?.program_full_name}</p>
                        </div>
                        {form.subject_combination && (
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Subjects</p>
                                <p className="font-medium break-words">{form.subject_combination}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Examinations */}
                {form.examinations && form.examinations.length > 0 && (
                    <div className="border-border border-t pt-6">
                        <h2 className="mb-4 flex items-center text-xl font-semibold">
                            <span className="bg-cyan-foreground mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8">
                                3
                            </span>
                            <span>Examination Details</span>
                        </h2>
                        <div className="space-y-6">
                            {form.examinations
                                .sort((a, b) => (a.name === 'Matric' ? -1 : a.name === 'Intermediate' && b.name !== 'Matric' ? -1 : 1))
                                .map((exam, index) => (
                                    <div
                                        key={exam.id || index}
                                        className="bg-secondary text-secondary-foreground border-border rounded-md border p-3 sm:p-4"
                                    >
                                        <h3 className="mb-3 text-lg font-medium">{exam.name}</h3>
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Year</p>
                                                <p className="font-medium">{exam.year || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Roll Number</p>
                                                <p className="font-medium">{exam.roll_no || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Total Marks</p>
                                                <p className="font-medium">{exam.total_marks || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Obtain Marks</p>
                                                <p className="font-medium">{exam.obtained_marks || 'N/A'}</p>
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
                <div className="border-border border-t pt-6">
                    <h2 className="mb-4 flex items-center text-xl font-semibold">
                        <span className="bg-cyan-foreground mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8">
                            4
                        </span>
                        <span>Contact Information</span>
                    </h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
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
                                <div className="border-border mt-2 space-y-1 border-t pt-4 sm:col-span-2 lg:col-span-3">
                                    <p className="text-card-foreground/80 text-sm font-medium">Guardian Information</p>
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

                        <div className="border-border mt-2 space-y-1 border-t pt-4 sm:col-span-3 lg:col-span-3">
                            <p className="text-card-foreground/80 text-sm font-medium">Address Information</p>
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

                {/* Documents */}
                {(form.documents && form.documents.length > 0) && (
                    <div className="border-border border-t pt-6">
                        <h2 className="mb-4 flex items-center text-xl font-semibold">
                            <span className="bg-cyan-foreground mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8">
                                5
                            </span>
                            <span>Provided Documents</span>
                        </h2>
                        <div className="space-y-6">
                            {form.documents.map((document, index) => (
                                <div
                                    key={document.key + index}
                                    className="bg-secondary text-secondary-foreground border-border rounded-md border p-3 sm:p-4"
                                >
                                    <h3 className="mb-3 text-lg font-medium">{document.name}</h3>
                                    <div className={cn("grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-x-8 sm:grid-cols-2 ", {
                                        "lg:grid-cols-3": auth.user
                                    })}>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">File Type</p>
                                            <p className="font-medium break-words">
                                                {document.mime_type === 'application/pdf' ? 'PDF Document' : document.mime_type}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Size</p>
                                            <p className="font-medium">
                                                {(document.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                        {auth.user ? (
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Action</p>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <a
                                                            href={route('document.view', {
                                                                documentKey: document.key,
                                                                formNo: form.form_no
                                                            })}
                                                            className="inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium text-sm"
                                                            target="_blank"
                                                        >
                                                            <EyeIcon className="h-4 w-4 mr-1" /> View
                                                        </a>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Click to view PDF document</TooltipContent>
                                                </Tooltip>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Full-Screen Photo Modal */}
            <AnimatePresence>
                {isPhotoOpen && form.photo_path && (
                    <motion.div
                        className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        onClick={() => setIsPhotoOpen(false)}
                    >
                        <motion.img
                            src={form.photo_path}
                            alt="Applicant Photo Full Screen"
                            className="max-h-[90vh] max-w-[90vw] object-contain"
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
