import React, { createContext, useContext, useReducer, Dispatch, useMemo } from 'react';
import { AxiosWrapper } from '@/lib/fetchWrapper';
import toast from 'react-hot-toast';

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

type FormData = {
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
  guardian_name: string;
  guardian_occupation: string;
  guardian_cell: string;
  present_address: string;
  permanent_address: string;
  inter_subjects: string[];
  examination: {
    matric: ExaminationRecord;
    intermediate: ExaminationRecord;
    associate: ExaminationRecord;
  };
  photo: File | null;
  [key: string]: any;
};

// Initial state
const initialInterSubjects: InterSubject[] = [
  { id: 1, name: 'English', readOnly: true },
  { id: 2, name: 'Urdu', readOnly: true },
  { id: 3, name: 'Islamiat', readOnly: true },
  { id: 4, name: 'Pak. Study', readOnly: true },
  { id: 5, name: '', readOnly: false },
  { id: 6, name: '', readOnly: false },
  { id: 7, name: '', readOnly: false },
];

const initialFormData: FormData = {
  shift: '',
  program_category: '',
  program_value: '',
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
  examination: {
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
  },
  photo: null,
};

// Action types
type ActionType =
  | { type: 'SET_FIELD'; payload: { key: string; value: any } }
  | { type: 'SET_INTER_SUBJECT'; payload: { id: number; value: string } }
  | { type: 'SET_PROGRAM'; payload: { category: string; value: string; checked: boolean } }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_ERRORS'; payload: Partial<FormData> }
  | { type: 'RESET_FORM' }
  | { type: 'SET_EXAMINATION'; payload: { name: keyof FormData['examination']; key: string; value: any } };

// Reducer function
function admissionFormReducer(state: any, action: ActionType) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, formData: { ...state.formData, [action.payload.key]: action.payload.value } };
    case 'SET_INTER_SUBJECT':
      return {
        ...state,
        interSubjects: state.interSubjects.map((subject: InterSubject) =>
          subject.id === action.payload.id && !subject.readOnly ? { ...subject, name: action.payload.value } : subject
        )
      };
    case 'SET_PROGRAM':
      return {
        ...state,
        formData: {
          ...state.formData,
          program_category: action.payload.checked ? action.payload.category : '',
          program_value: action.payload.checked ? action.payload.value : '',
        }
      };
    case 'SET_PROCESSING':
      return { ...state, processing: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'SET_EXAMINATION':
      return {
        ...state,
        formData: {
          ...state.formData,
          examination: {
            ...state.formData.examination,
            [action.payload.name]: {
              ...state.formData.examination[action.payload.name],
              [action.payload.key]: action.payload.value
            }
          }
        }
      };
    case 'RESET_FORM':
      return { formData: initialFormData, interSubjects: initialInterSubjects, processing: false, errors: {} };
    default:
      return state;
  }
}

// Context separation
const FormStateContext = createContext<{ formData: FormData; interSubjects: InterSubject[]; processing: boolean; errors: Partial<FormData> }>({ formData: initialFormData, interSubjects: initialInterSubjects, processing: false, errors: {} });
const FormDispatchContext = createContext<Dispatch<ActionType> | undefined>(undefined);
const SubmitFormContext = createContext<(() => Promise<void>) | undefined>(undefined);

export const AdmissionFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(admissionFormReducer, {
    formData: initialFormData,
    interSubjects: initialInterSubjects,
    processing: false,
    errors: {},
  });

  const memoizedState = useMemo(() => state, [state.formData, state.interSubjects, state.processing, state.errors]);

  const submitForm = async () => {
    const { formData, interSubjects } = state;

    if (!formData.photo) {
      toast.error('Please attach one recent Photograph (2" x 1.5") with blue background');
      return;
    }

    dispatch({ type: 'SET_PROCESSING', payload: true });
    dispatch({ type: 'SET_ERRORS', payload: {} });

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, key === 'inter_subjects' ? JSON.stringify(interSubjects.map((s: InterSubject) => s.name)) : JSON.stringify(formData[key]));
    });

    try {
      const response = await AxiosWrapper({ url: route('admission-form.store'), method: 'POST', body: submitData });
      toast.success(response.data.message);
      if (response.data.redirectUrl) window.location.href = response.data.redirectUrl;
    } catch (error: any) {
      if (error.response?.status === 422) dispatch({ type: 'SET_ERRORS', payload: error.response.data.errors });
      toast.error(error.response?.data?.message || 'Submission failed.');
    } finally {
      dispatch({ type: 'SET_PROCESSING', payload: false });
    }
  };

  return (
    <FormStateContext.Provider value={memoizedState}>
      <FormDispatchContext.Provider value={dispatch}>
        <SubmitFormContext.Provider value={submitForm}>
          {children}
        </SubmitFormContext.Provider>
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
};

// Hooks
export const useAdmissionFormState = () => useContext(FormStateContext);
export const useAdmissionFormDispatch = () => useContext(FormDispatchContext);
export const useSubmitForm = () => useContext(SubmitFormContext);

// Utility hook for selecting specific fields
export const useFormField = <K extends keyof FormData>(field: K) => {
  const state = useAdmissionFormState();
  return state.formData[field];
};

export const setInterSubject = (id: number, value: string) => {
  const dispatch = useAdmissionFormDispatch();
  dispatch?.({ type: 'SET_INTER_SUBJECT', payload: { id, value } });
}

export const setProgram = (category: string, value: string, checked: boolean) => {
  const dispatch = useAdmissionFormDispatch();
  dispatch?.({ type: 'SET_PROGRAM', payload: { category, value, checked } });
}

export const setExamination = (name: keyof FormData['examination'], key: string, value: any) => {
  const dispatch = useAdmissionFormDispatch();
  dispatch?.({ type: 'SET_EXAMINATION', payload: { name, key, value } });
}