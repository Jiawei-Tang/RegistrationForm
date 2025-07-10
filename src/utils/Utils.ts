import type { RegistrationFormData } from "../models/RegistrationFormData";

// export interface VerificationResult {
//     isValid: boolean;
//     message?: string;
// }

export const verifyFormData = (step: number, formData: RegistrationFormData): boolean => {
    switch (step) {
        case 1:
            return verifyBasicInfo(formData);
        case 2:
            return verifyDetailInfo(formData);
        case 3:
            return verifyAccountInfo(formData);
        default:
            return true;
    }
};

const verifyBasicInfo = (formData: RegistrationFormData): boolean => {
    // verify first name and last name
    if (!verifyName(formData.firstName) || !verifyName(formData.lastName)) {
        return false;
    }

    // verify date of birth
    if (!formData.dateOfBirth || !(formData.dateOfBirth instanceof Date)) {
        return false;
    }

    return true;
}

export const verifyName = (name: string): boolean => {
    if (!name || name.trim() === '') {
        return false;
    }
    const nameLength = name.trim().length;
    return nameLength >= 2 && nameLength <= 80;
}

const verifyDetailInfo = (formData: RegistrationFormData): boolean => {
    if (!verifyName(formData.country) || !verifyGender(formData.gender)) {
        return false;
    }
    return true;
}

export const verifyGender = (gender: string): boolean => {
    if (!gender || !['male', 'female'].includes(gender)) {
        return false;
    }
    return true;
}

const verifyAccountInfo = (formData: RegistrationFormData): boolean => {
    if (!verifyEmail(formData.email)) {
        return false;
    } else if (!verifyPassword(formData.password)) {
        return false;
    }
    return true;
}

export const verifyEmail = (email: string): boolean => {
    if (!email || email.trim() === '') {
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const verifyPassword = (password: string): boolean => {
    if (!password || password.length < 8 || password.length > 30) {
        return false;
    }
    return true;
}
