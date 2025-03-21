type Timestamps = {
  created_at: string;
  updated_at: string;
};

type FormStatus = 'pending' | 'approved' | 'rejected';

type Examination = {
  id: number;
  admission_form_id: number;
  name: string;
  year: string;
  roll_no: string;
  marks: string;
  percentage: string;
  subjects: string;
  board_university: string;
  school_college: string;
}

type AdmissionForm = {
  form_no: number;
  diary_no: string | null;
  college_roll_no: string | null;
  status: FormStatus;
  shift: string;
  program_category: string;
  program_value: string;
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
  inter_subjects: string[];
  photo_path: string;
  examinations: Examination[];
} & Timestamps;


interface PaginationLink {
  url: string
  label: string
  active: boolean
}

interface LengthAwarePaginator<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

interface ResourcePaginator<T> {
  data: T[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: PaginationLink[]
    path: string
    per_page: number
    to: number
    total: number
  }
}


export { Examination, AdmissionForm, FormStatus, PaginationLink, LengthAwarePaginator, ResourcePaginator };