import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

// Create contexts for form and fields
const { fieldContext, formContext } = createFormHookContexts();

// Define the custom form hook
export const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {}, // Add custom field components here if needed (e.g., CNICInput, PhoneNumberInput)
    formComponents: {}, // Add custom form-level components if needed
});
