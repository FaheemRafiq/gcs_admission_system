import { formOptions } from '@tanstack/react-form';

export interface ExaminationRecord {
    name: string;
    year: string;
    roll_no: string;
    total_marks: string;
    obtained_marks: string;
    subjects: string;
    board_university: string;
    school_college: string;
}

export interface DocumentRequirement {
    key: string;
    name: string;
    is_required: boolean;
    value: File | null;
}

export interface FormData {
    shift: string;
    program_id: string;
    subject_combination: string;
    name: string;
    cell: string;
    father_name: string;
    father_cell: string;
    cnic: string;
    domicile: string;
    religion: string;
    dob: string;
    email: string;
    father_occupation: string;
    father_cnic: string;
    guardian_name: string;
    guardian_occupation: string;
    guardian_cell: string;
    present_address: string;
    permanent_address: string;
    examination: ExaminationRecord[];
    documents: DocumentRequirement[];
    photo: File | null;
}

export const admissionFormOpts = formOptions({
    defaultValues: {
        shift: '',
        program_id: '',
        subject_combination: '',
        name: '',
        cell: '',
        father_name: '',
        father_cell: '',
        cnic: '',
        domicile: '',
        religion: '',
        dob: '',
        email: '',
        father_occupation: '',
        father_cnic: '',
        guardian_name: '',
        guardian_occupation: '',
        guardian_cell: '',
        present_address: '',
        permanent_address: '',
        examination: [],
        documents: [],
        photo: null,
    } as FormData,
});
