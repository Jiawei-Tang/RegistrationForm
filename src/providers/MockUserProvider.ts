import { RegistrationFormData } from "../models/RegistrationFormData";

export class MockUserDataProvider {
    async saveUser(formData: RegistrationFormData): Promise<void> {
        return this.mockSaveUser(formData);
    }  

    mockSaveUser = async (formData: RegistrationFormData): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("User data saved:", formData);
                resolve();
            }, formData.avatar ? 2000 : 1000);
        });
    };
}