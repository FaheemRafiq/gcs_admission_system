import { create } from 'zustand';
import { AxiosWrapper } from '@/lib/fetchWrapper';
import toast from 'react-hot-toast';
import { ProgramGroup, Shift } from '@/types/database';

// Interfaces
export interface InterSubject {
  id: number;
  name: string;
  readOnly: boolean;
}

export interface ExaminationRecord {
  name: string;
  year: string;
  roll_no: string;
  marks: string;
  percentage: string;
  subjects: string;
  board_university: string;
  school_college: string;
}

export type FormData = {
  shift: string;
  program: string;
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
  inter_subjects: string[];
  photo: File | null;
  [key: string]: any;
};

export type ExaminationForm = {
  matric: ExaminationRecord;
  intermediate: ExaminationRecord;
  associate: ExaminationRecord;
  [key: string]: any;
};

const initialFormData: FormData = {
  shift: '',
  program: '',
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
  inter_subjects: [],
  photo: null,
};

const initialExaminationForm: ExaminationForm = {
  matric: {
    name: 'Matric',
    year: '',
    roll_no: '',
    marks: '',
    percentage: '',
    subjects: '',
    board_university: '',
    school_college: '',
  },
  intermediate: {
    name: 'Intermediate',
    year: '',
    roll_no: '',
    marks: '',
    percentage: '',
    subjects: '',
    board_university: '',
    school_college: '',
  },
  associate: {
    name: 'Associate Degree',
    year: '',
    roll_no: '',
    marks: '',
    percentage: '',
    subjects: '',
    board_university: '',
    school_college: '',
  },
};

// Zustand Store
export const useAdmissionFormStore = create<{
  formData: FormData;
  examinationData: ExaminationForm;
  processing: boolean;
  errors: Partial<FormData>;
  shifts: Shift[];
  program_groups: ProgramGroup[];
  sectionsCompleted: number[];
  setField: (key: keyof FormData, value: any) => void;
  setBulkFields: (fields: Partial<FormData>) => void;
  setProgram: (category: string, value: string, checked: boolean) => void;
  setExamination: (name: keyof ExaminationForm, key: string, value: any) => void;
  submitForm: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setShifts: (shifts: Shift[]) => void;
  setProgramGroups: (programGroups: ProgramGroup[]) => void;
  setSectionsCompleted: (sectionsCompleted: number[]) => void;
  setErrors: (errors: Partial<FormData>) => void;
}>((set, get) => ({
  // Initial State
  formData: initialFormData,
  examinationData: initialExaminationForm,
  processing: false,
  errors: {},

  // State Data
  shifts: [],
  program_groups: [],
  sectionsCompleted: [],

  // Actions
  setField: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),

  setBulkFields: (fields) =>
    set((state) => ({
      formData: { ...state.formData, ...fields },
    })),

  setProgram: (category, value, checked) =>
    set((state) => ({
      formData: {
        ...state.formData,
        program_category: checked ? category : '',
        program_value: checked ? value : '',
      },
    })),

  setExamination: (name, key, value) =>
    set((state) => ({
      examinationData: {
        ...state.examinationData,
        [name]: {
          ...state.examinationData[name],
          [key]: value,
        },
      },
    })),

  submitForm: async (e) => {
    e.preventDefault();

    const { formData, examinationData } = get();

    if (!formData.photo) {
      toast.error('Please attach one recent Photograph (2" x 1.5") with blue background');
      return;
    }

    set({ processing: true, errors: {} });

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(
        key, JSON.stringify(formData[key])
      );
    });

    submitData.append('examination', JSON.stringify(examinationData));

    try {
      const response = await AxiosWrapper({
        url: route('admission-form.store'),
        method: 'POST',
        body: submitData,
      });
      toast.success(response.data.message);
      if (response.data.redirectUrl) window.location.href = response.data.redirectUrl;
    } catch (error: any) {
      if (error.response?.status === 422) {
        set({ errors: error.response.data.errors });
      }
      toast.error(error.response?.data?.message || 'Submission failed.');
    } finally {
      set({ processing: false });
    }
  },

  resetForm: () =>
    set({
      formData: initialFormData,
      examinationData: initialExaminationForm,
      processing: false,
      errors: {},
    }),

  setShifts: (shifts) => set({ shifts }),
  setProgramGroups: (programGroups) => set({ program_groups: programGroups }),
  setSectionsCompleted: (sectionsCompleted) => set({ sectionsCompleted }),
  setErrors: (errors) => set({ errors }),
}));

// Optional Utility Hook for Selecting Specific Fields
export const useFormField = <K extends keyof FormData>(field: K) => {
  return useAdmissionFormStore((state) => state.formData[field]);
};