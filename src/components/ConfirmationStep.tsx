import type { RegistrationFormData } from '../models/RegistrationFormData.ts';
import { Stack } from '@fluentui/react';

interface ConfirmationStepProps {
    formData: RegistrationFormData;
}

export const ConfirmationStep = ({ formData }: ConfirmationStepProps) => {
    return (
        <>
            <h3>Confirm Your Info</h3>
            <Stack tokens={{ childrenGap: 10 }}>
                <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>Date of Birth:</strong> {formData.dateOfBirth.toLocaleDateString()}</div>
                <div><strong>Country:</strong> {formData.country}</div>
                <div><strong>Gender:</strong> {formData.gender}</div>
                <div><strong>Email:</strong> {formData.email}</div>
            </Stack>
        </>
    );
}