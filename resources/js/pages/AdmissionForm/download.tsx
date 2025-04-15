import React, { useEffect } from 'react';
import type { AdmissionForm as TypeAdmissionForm } from '@/types/database';

interface AdmissionFormProps {
    formData: TypeAdmissionForm;
}

const AdmissionForm: React.FC<AdmissionFormProps> = ({ formData }) => {
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        // Trigger print dialog when component mounts
        window.print();

        // Handle print completion
        const handleAfterPrint = () => {
            window.history.go(-1); // Go back to previous page
        };

        // Handle print cancellation (modern browsers)
        const handlePrintCancel = () => {
            window.history.go(-1); // Go back to previous page
        };

        window.addEventListener('afterprint', handleAfterPrint);
        
        // Fallback for print cancellation detection
        const mediaQueryList = window.matchMedia('print');
        mediaQueryList.addEventListener('change', (e) => {
            if (!e.matches) {
                // If print dialog is closed without printing
                handlePrintCancel();
            }
        });

        return () => {
            window.removeEventListener('afterprint', handleAfterPrint);
            mediaQueryList.removeEventListener('change', handlePrintCancel);
        };
    }, [window.history]);

    return (
        <div className="font-sans text-black m-0 p-[10mm] w-[210mm]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <img
                        src="/android-chrome-512x512.png"
                        alt="College Logo"
                        className="w-[80px] h-auto"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                </div>
                <div className="text-center flex-1">
                    <div className="flex justify-between">
                        <div></div>
                        <h1 className="text-[24px] font-bold text-red-600 mb-[5px]">
                            Government Graduate College of Science
                        </h1>
                        <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">
                            گورنمنٹ گریجویٹ کالج آف سائنس
                        </div>
                    </div>
                    <p className="text-[12px] text-black my-[2px]">Wahdat Road, Lahore (www.gcslahore.edu.pk)</p>
                    <p className="text-[12px] font-bold my-[2px]">APPLICATION FOR ADMISSION - {currentYear}</p>
                </div>
                <div className="w-[90px] h-[120px] border border-black text-center p-[5px] text-[10px]">
                    <p>Paste one recent<br />photograph of size<br />2" x 1.5" with blue<br />background</p>
                </div>
            </div>

            {/* Form Info */}
            <div className="flex justify-between mb-[10px]">
                <div>
                    <p className="text-[12px] my-[2px]">Form No: <b>{formData.form_no || '____'}</b></p>
                    <p className="text-[12px] my-[2px]">College Roll No: ________________</p>
                </div>
                <div>
                    <p className="text-[12px] my-[2px]">Diary No: _______________</p>
                </div>
            </div>

            {/* Group Selection for Intermediate */}
            <div className="mb-[10px]">
                <div className="flex justify-between">
                    <p className="text-[12px] my-[2px]"><strong>GROUP FOR INTERMEDIATE CLASS (Tick One)</strong></p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        گروپ برائے انٹرمیڈیٹ کلاس (ایک منتخب کریں)
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-[5px] mt-[10px] mb-[10px]">
                    {['Pre-Med', 'Pre-Eng', 'ICS', 'I.Com', 'F.A'].map((program) => (
                        <div key={program} className="border border-black p-[5px] text-center text-[10px]">
                            <div className={`w-[12px] h-[12px] border border-black inline-block mr-[5px] relative ${formData.program?.name === program ? "after:content-['✓'] after:absolute after:-top-[3px] after:left-[2px]" : ''}`} />
                            <span>{program}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shift Selection */}
            <div className="mb-[10px]">
                <div className="flex justify-between">
                    <p className="text-[12px] my-[2px]"><strong>SHIFT (Tick One)</strong></p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        شفٹ (ایک منتخب کریں)
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-[5px] mt-[5px]">
                    {['Morning', 'Evening'].map((shift) => (
                        <div key={shift} className="border border-black p-[5px] text-center text-[10px]">
                            <div className={`w-[12px] h-[12px] border border-black inline-block mr-[5px] relative ${formData.shift === shift ? "after:content-['✓'] after:absolute after:-top-[3px] after:left-[2px]" : ''}`} />
                            <span>{shift}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Major Discipline for BS */}
            <div className="mb-[10px]">
                <div className="flex justify-between">
                    <p className="text-[12px] my-[2px]"><strong>MAJOR DISCIPLINE FOR BS 4 YEARS DEGREE PROGRAM (Tick One)</strong></p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        میجر ڈسپلن برائے بی ایس 4 سالہ ڈگری پروگرام (ایک منتخب کریں)
                    </div>
                </div>
                {[
                    ['BBA', 'Botany', 'Bio Tech', 'Chemistry', 'Computer Science'],
                    ['Economics', 'English', 'Geography', 'Mathematics', 'Physics'],
                    ['Psychology', 'Statistics', 'Urdu', 'Zoology']
                ].map((group, index) => (
                    <div key={index} className="grid grid-cols-5 gap-[5px] mt-[10px] mb-[10px]">
                        {group.map((program) => (
                            <div key={program} className="border border-black p-[5px] text-center text-[10px]">
                                <div className={`w-[12px] h-[12px] border border-black inline-block mr-[5px] relative ${formData.program?.name === program ? "after:content-['✓'] after:absolute after:-top-[3px] after:left-[2px]" : ''}`} />
                                <span>{program}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Subject Department */}
            <div className="mb-[10px]">
                <div className="flex justify-between">
                    <p className="text-[12px] my-[2px]"><strong>SUBJECT DEPARTMENT FOR BS SEMESTER-I (Tick One)</strong></p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        سبجیکٹ ڈیپارٹمنٹ برائے بی ایس سمسٹر 1 (ایک منتخب کریں)
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-[5px] mt-[10px] mb-[10px]">
                    {['Chemistry', 'Physics', 'Mathematics', 'Zoology'].map((program) => (
                        <div key={program} className="border border-black p-[5px] text-center text-[10px]">
                            <div className={`w-[12px] h-[12px] border border-black inline-block mr-[5px] relative ${formData.program?.name === program ? "after:content-['✓'] after:absolute after:-top-[3px] after:left-[2px]" : ''}`} />
                            <span>{program}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Associate Degree */}
            <div className="mb-4">
                <div className="flex justify-between">
                    <p className="text-[12px] my-[2px]"><strong>Associate Degree in Commerce (B.Com-IT) 2 Years</strong></p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        ایسوسی ایٹ ڈگری ان کامرس (بی کام آئی ٹی) 2 سالہ
                    </div>
                </div>
                <div className="border border-black p-[5px] text-center text-[10px] w-[30px] inline-block">
                    <div className={`w-[12px] h-[12px] border border-black inline-block mr-[5px] relative ${formData.program?.name === 'B.Com-IT' ? "after:content-['✓'] after:absolute after:-top-[3px] after:left-[2px]" : ''}`} />
                </div>
            </div>

            {/* Personal Information */}
            <div className="mb-4">
                <table className="w-full border-collapse border border-black mt-2">
                    <tbody>
                        <tr>
                            <td className="w-1/4 border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Name of Candidate</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">امیدوار کا نام</div>
                                </div>
                            </td>
                            <td className="w-1/4 border border-black p-1 text-[12px] text-center">{formData.name}</td>
                            <td className="w-1/4 border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Cell #</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">سیل نمبر</div>
                                </div>
                            </td>
                            <td className="w-1/4 border border-black p-1 text-[12px] text-center">{formData.cell}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Father's Name</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">والد کا نام</div>
                                </div>
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">{formData.father_name}</td>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Cell #</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">سیل نمبر</div>
                                </div>
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">{formData.father_cell}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Candidate's CNIC/'Bay' Form No.</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">امیدوار کا شناختی کارڈ/بے فارم نمبر</div>
                                </div>
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">{formData.cnic}</td>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Domicile</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">ڈومیسائل</div>
                                </div>
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">{formData.domicile}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Date of Birth (According to S.S.C)</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">تاریخ پیدائش (ایس ایس سی کے مطابق)</div>
                                </div>
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">
                                {formData.dob ? new Date(formData.dob).toLocaleDateString('en-GB') : ''}
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Religion</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">مذہب</div>
                                </div>
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">{formData.religion}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Father's Occupation</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">والد کا پیشہ</div>
                                </div>
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">{formData.father_occupation}</td>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">E-mail</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">ای میل</div>
                                </div>
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">{formData.email}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Father's CNIC No.</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">والد کا شناختی کارڈ نمبر</div>
                                </div>
                            </td>
                            <td colSpan={3} className="border border-black p-1 text-[12px] text-center">{formData.father_cnic}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Guardian's Name</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">سرپرست کا نام</div>
                                </div>
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">{formData.guardian_name}</td>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Occupation</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">پیشہ</div>
                                </div>
                            </td>
                            <td className="border border-black p-1 text-[12px] text-center">{formData.guardian_occupation}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Present Address</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">موجودہ پتہ</div>
                                </div>
                            </td>
                            <td colSpan={3} className="border border-black p-1 text-[12px] text-center">{formData.present_address}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Permanent Home Address</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">مستقل گھر کا پتہ</div>
                                </div>
                            </td>
                            <td colSpan={3} className="border border-black p-1 text-[12px] text-center">{formData.permanent_address}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Subjects Section */}
            <div className="mb-4">
                <div className="flex justify-between">
                    <p className="text-[12px] my-[2px]"><strong>Subjects</strong> (For Intermediate Classes only)</p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        مضامین (صرف انٹرمیڈیٹ کلاسز کے لیے)
                    </div>
                </div>
                <table className="w-full border-collapse border border-black mt-2">
                    <tbody>
                        <tr>
                            <td className="border border-black p-1 text-[12px] text-center">(1) English/انگریزی</td>
                            <td className="border border-black p-1 text-[12px] text-center">(2) Urdu/اردو</td>
                            <td className="border border-black p-1 text-[12px] text-center">(3) Islamiat/اسلامیات</td>
                            <td className="border border-black p-1 text-[12px] text-center">(4) Pak Studies/پاک سٹڈیز</td>
                            <td className="border border-black p-1 text-[12px] text-center">(5) _____________</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-1 text-[12px] text-center">(6) _____________</td>
                            <td className="border border-black p-1 text-[12px] text-center">(7) _____________</td>
                            <td colSpan={3} className="border border-black p-1 text-[12px] text-center">
                                Elective Subject Set No as given in Prospectus / انتخابی مضامین سیٹ نمبر پراسپیکٹس میں دیا گیا ہے
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Examination Details */}
            <div className="mb-4">
                <table className="w-full border-collapse border border-black mt-2">
                    <thead>
                        <tr>
                            <th rowSpan={2} className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Examination</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">امتحان</div>
                                </div>
                            </th>
                            <th rowSpan={2} className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Year</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">سال</div>
                                </div>
                            </th>
                            <th rowSpan={2} className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Roll No</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">رول نمبر</div>
                                </div>
                            </th>
                            <th rowSpan={2} className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Marks</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">نمبرات</div>
                                </div>
                            </th>
                            <th rowSpan={2} className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">%age</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">فیصد</div>
                                </div>
                            </th>
                            <th rowSpan={2} className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Subjects</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">مضامین</div>
                                </div>
                            </th>
                            <th colSpan={2} className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">From where passed</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">کہاں سے پاس کیا</div>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">Board/University</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">بورڈ/یونیورسٹی</div>
                                </div>
                            </th>
                            <th className="border border-black p-1 text-[12px] text-center">
                                <div className="flex justify-between">
                                    <p className="my-[2px]">School/College</p>
                                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right">سکول/کالج</div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.examinations && formData.examinations.length > 0 ? (
                            formData.examinations.map((exam, index) => (
                                <tr key={index}>
                                    <td className="border border-black p-1 text-[12px] text-center">{exam.name}</td>
                                    <td className="border border-black p-1 text-[12px] text-center">{exam.year || 'N/A'}</td>
                                    <td className="border border-black p-1 text-[12px] text-center">{exam.roll_no || 'N/A'}</td>
                                    <td className="border border-black p-1 text-[12px] text-center">{exam.obtained_marks}/{exam.total_marks}</td>
                                    <td className="border border-black p-1 text-[12px] text-center">{exam.percentage ? `${exam.percentage}%` : 'N/A'}</td>
                                    <td className="border border-black p-1 text-[12px] text-center">{exam.subjects || 'N/A'}</td>
                                    <td className="border border-black p-1 text-[12px] text-center">{exam.board_university || 'N/A'}</td>
                                    <td className="border border-black p-1 text-[12px] text-center">{exam.school_college || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <>
                                <tr>
                                    <td className="border border-black p-1 text-[12px] text-center">Matric<br/>(Arts/Science)</td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1 text-[12px] text-center">Intermediate<br/>(Arts/Science)</td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1 text-[12px] text-center">Associate<br/>Degree</td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                    <td className="border border-black p-1 text-[12px] text-center"></td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Signature Section */}
            <div className="flex justify-between mt-5">
                <div className="text-center w-[30%]">
                    <div className="border-t border-black w-[150px] mt-[30px] inline-block" />
                    <p className="text-[12px] my-[2px]">Signature of the Candidate</p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        دستخط امیدوار
                    </div>
                </div>
                <div className="text-center w-[30%]">
                    <div className="border-t border-black w-[150px] mt-[30px] inline-block" />
                    <p className="text-[12px] my-[2px]">Signature of the Father / Guardian</p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        دستخط والد/سرپرست
                    </div>
                </div>
            </div>

            {/* Admission Committee Section */}
            <div className="mt-5 flex justify-between">
                <div className="text-center w-[30%]">
                    <div className="border-t border-black w-[150px] mt-[30px] inline-block" />
                    <p className="text-[12px] my-[2px]">Recommended for Admission</p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        داخلے کی سفارش کی گئی
                    </div>
                </div>
                <div className="text-center w-[30%]">
                    <div className="border-t border-black w-[150px] mt-[30px] inline-block" />
                    <p className="text-[12px] my-[2px]">Admitted</p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        داخل
                    </div>
                </div>
            </div>

            <div className="mt-5 flex justify-between">
                <div className="text-center w-[30%]">
                    <div className="border-t border-black w-[150px] mt-[30px] inline-block" />
                    <p className="text-[12px] my-[2px]">Convener of Admission Committee</p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        کنوینر داخلہ کمیٹی
                    </div>
                </div>
                <div className="text-center w-[30%]">
                    <div className="border-t border-black w-[150px] mt-[30px] inline-block" />
                    <p className="text-[12px] my-[2px]">Principal</p>
                    <div className="font-['Jameel_Noori_Nastaleeq','Noto_Nastaliq_Urdu',Arial,sans-serif] text-right text-[12px]">
                        پرنسپل
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-[30px] border-t border-dashed border-black pt-[10px]">
                <div className="text-center mb-[10px]">
                    <h2 className="text-[24px] font-bold">GOVERNMENT GRADUATE COLLEGE OF SCIENCE</h2>
                    <p className="text-[12px] my-[2px]">WAHDAT ROAD, LAHORE.</p>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-[12px] my-[2px]">Form No: <b>{formData.form_no || '____'}</b></p>
                        <p className="text-[12px] my-[2px]">Name of Candidate: {formData.name}</p>
                        <p className="text-[12px] my-[2px]">
                            Group/Discipline: {formData.program?.name || formData.program?.program_group?.name || '____'}
                        </p>
                    </div>
                    <div>
                        <p className="text-[12px] my-[2px]">Diary No: _______________</p>
                        <p className="text-[12px] my-[2px]">Father's Name: {formData.father_name}</p>
                        <p className="text-[12px] my-[2px]">
                            1st Shift: {formData.shift === 'Morning' ? '✓' : '_____'} 
                            2nd Shift: {formData.shift === 'Evening' ? '✓' : '_____'}
                        </p>
                    </div>
                    <div>
                        <p className="text-[12px] my-[2px]">Date: _______________</p>
                        <p className="text-[12px] my-[2px]">Class: _______________</p>
                    </div>
                </div>
                <div className="text-right mt-5">
                    <div className="border-t border-black w-[150px] mt-[30px] inline-block" />
                    <p className="text-[12px] my-[2px]">Signature of Receiving Official</p>
                </div>
            </div>
        </div>
    );
};

export default AdmissionForm;