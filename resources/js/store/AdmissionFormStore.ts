import { AxiosWrapper } from '@/lib/fetchWrapper';
import { FormData as TypeFormData } from '@/pages/AdmissionForm/_components/shared-form';
import { type ProgramGroup, type Shift } from '@/types/database';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAdmissionFormStore = create<{
    shifts: Shift[];
    program_groups: ProgramGroup[];
    processing: boolean;
    setShifts: (shifts: Shift[]) => void;
    setProgramGroups: (programGroups: ProgramGroup[]) => void;
    submitForm: (formData: TypeFormData, formRef: React.RefObject<HTMLFormElement | null>) => Promise<void>;
}>((set, get) => ({
    // State Data
    shifts: [],
    program_groups: [],
    processing: false,

    setShifts: (shifts) => set({ shifts }),
    setProgramGroups: (programGroups) => set({ program_groups: programGroups }),
    submitForm: async (formData, formRef) => {
        if (!formData.photo) {
            toast.error('Please attach one recent Photograph (2" x 1.5") with blue background');
            window.scroll({ top: 0, behavior: 'smooth' });
            return;
        }

        set({ processing: true });
        const submitData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'examination') {
                submitData.append(key, JSON.stringify(value));
            } else if (key !== 'documents' && key !== 'photo') {
                submitData.append(key, value as string | Blob);
            }
        });

        // Append photo
        if (formData.photo) {
            submitData.append('photo', formData.photo);
        }

        // Append multiple documents properly
        formData.documents.forEach((doc, index) => {
            if (doc.value) {
                submitData.append(`documents[${index}][key]`, doc.key);
                submitData.append(`documents[${index}][name]`, doc.name);
                submitData.append(`documents[${index}][value]`, doc.value); // File
            }
        });

        try {
            const response = await AxiosWrapper({
                url: route('admission-form.store'),
                method: 'POST',
                body: submitData,
            });
            toast.success(response.data.message);
            if (response.data.redirectUrl) {
                setTimeout(() => (window.location.href = response.data.redirectUrl), 500);
            }
        } catch (error: any) {
            if (error.response?.status === 422 && error.response?.data?.errors) {
                const validationErrors: Record<string, string> = error.response.data.errors;
                Object.keys(validationErrors).forEach((key) => {
                    const element = formRef.current?.querySelector<HTMLInputElement>(`[id="${key}"]`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => element.focus(), 500);
                        return;
                    }
                });
                toast.error(error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] || 'Please correct the errors in the form.');
            } else if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            }
        } finally {
            set({ processing: false });
        }
    },
}));
