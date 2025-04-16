type Timestamps = {
    created_at: string;
    updated_at: string;
};

type FormStatus = 'pending' | 'approved' | 'rejected';
type Status = 'active' | 'inactive';

type FormDocument = {
    key: string;
    name: string;
    original_name: string;
    mime_type: string | null;
    size: number;
    path: string;
};

type FormExamination = {
    id: number;
    admission_form_id: number;
    name: string;
    year: string;
    roll_no: string;
    total_marks: number;
    obtained_marks: number;
    percentage: number;
    subjects: string;
    board_university: string;
    school_college: string;
};

type AdmissionForm = {
    form_no: number;
    diary_no: string | null;
    college_roll_no: string | null;
    status: FormStatus;
    shift: string;
    program_id: string;
    subject_combination: string | null;
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
    guardian_name: string | null;
    guardian_occupation: string | null;
    guardian_cell: string | null;
    present_address: string;
    permanent_address: string;
    photo_path: string;
    examinations: FormExamination[];
    form_key: string;
    documents: FormDocument[] | null;

    program?: Program;
} & Timestamps;

type SubjectCombination = {
    id: number;
    program_id: number;
    subjects: string;
} & Timestamps;

type ExaminationResult = {
    id: number;
    title: string;
} & Timestamps;

type Shift = {
    id: number;
    name: string;
    status: Status;
} & Timestamps;

type CustomDocument = {
    id: number;
    name: string;
    document_key: string;
};

type DocumentRequirement = {
    id: number;
    document_id: number;
    program_group_id: number;
    program_id: number;
    is_required: boolean;

    document?: CustomDocument;
    program_group?: ProgramGroup;
    program?: Program;
} & Timestamps;

type ProgramGroup = {
    id: number;
    name: string;
    status: Status;

    programs?: Program[];
    examination_results?: ExaminationResult[];
    document_requirements?: DocumentRequirement[];
    documents?: CustomDocument[];
} & Timestamps;

type Program = {
    id: number;
    name: string;
    abbreviation: string;
    status: Status;
    shift_id: number | null;
    program_group_id: number;

    program_group?: ProgramGroup;
    shift?: Shift;
    examination_results?: ExaminationResult[];
    subject_combinations?: SubjectCombination[];
    document_requirements?: DocumentRequirement[];
    documents?: CustomDocument[];

    // appends
    program_full_name: string;
} & Timestamps;

// Pagination
interface PaginationLink {
    url: string;
    label: string;
    active: boolean;
}

interface LengthAwarePaginator<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface ResourcePaginator<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: PaginationLink[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export {
    AdmissionForm,
    CustomDocument as Document,
    DocumentRequirement,
    ExaminationResult,
    FormExamination,
    FormStatus,
    LengthAwarePaginator,
    PaginationLink,
    Program,
    ProgramGroup,
    ResourcePaginator,
    Shift,
    Status,
    SubjectCombination,
};
