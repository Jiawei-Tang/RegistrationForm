import { useState, useRef, type ReactHTMLElement } from 'react';
import { Panel, PrimaryButton, DefaultButton, TextField, Dropdown, Stack, DatePicker, mergeStyleSets, PanelType } from '@fluentui/react';
import type { RegistrationFormData } from '../models/RegistrationFormData.ts';
import { BasicInfoStep } from './BasicInfoStep';
import { DetailsStep } from './DetailsStep';
import { AccountStep } from './AccountStep';
import { ConfirmationStep } from './ConfirmationStep';
import { verifyFormData } from '../utils/Utils.ts';

const styles = mergeStyleSets({
    container: {
        padding: 20,
    },
    navButtons: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-between',
    },
});

interface RegistrationPanelProps {
    isPanelOpen: boolean;
    onDismiss: () => void;
}

export function RegistrationPanel(props: RegistrationPanelProps) {
    // const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [step, setStep] = useState(1);
    const stepTextRef = useRef<any>(null);

    const emptyFormData: RegistrationFormData = {
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(new Date().setFullYear(2000)),
        country: '',
        gender: '',
        email: '',
        password: '',
    };

    // Form state
    const [formData, setFormData] = useState<RegistrationFormData>(emptyFormData);

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log('Submitted:', formData);
        setStep(1);
        onDismiss();
    };

    const onDismiss = () => {
        setStep(1);
        setFormData(emptyFormData);
        props.onDismiss();
    }

    const handleNextStep = () => {
        const verificationResult = verifyFormData(step, formData);
        if (!verificationResult) {
            alert('Please fill in all required fields correctly.');
        }
        else {
            setStep((prev) => Math.min(prev + 1, 4));
        }        
    };

    const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const onRenderFooterContent = () => (
        <div className={styles.navButtons}>
            {/* Cancel or Back */}
            {step > 1 && <DefaultButton text="Back" onClick={handlePrevStep} />}
            {step === 1 && <DefaultButton text="Cancel" onClick={onDismiss} />}
            {/* Next or Submit */}
            {step < 4 && <PrimaryButton text="Next" onClick={handleNextStep} />}
            {step === 4 && <PrimaryButton text="Submit" onClick={handleSubmit} />}
        </div>
    );

    return (
        <>
            <Panel
                isOpen={props.isPanelOpen}
                onOpened={() => stepTextRef.current?.focus}
                onDismiss={onDismiss}
                headerText="Registration Form for New Users"
                type={PanelType.large}
                onRenderFooterContent={onRenderFooterContent}
                closeButtonAriaLabel="Close"
            >
                <div className={styles.container}>
                    <h2 ref={stepTextRef}>Step {step} of 4</h2>
                    {step === 1 && (
                        <BasicInfoStep
                            firstName={formData.firstName}
                            lastName={formData.lastName}
                            dateOfBirth={formData.dateOfBirth}
                            onChange={(field, value) => handleChange(field, value)}
                        />
                    )}

                    {step === 2 && (
                        <>
                            <DetailsStep 
                                country={formData.country}
                                gender={formData.gender}
                                avatar=''
                                onChange={(field, value) => handleChange(field, value)}
                            />
                        </>
                    )}

                    {step === 3 && (
                        <AccountStep
                            email={formData.email}
                            password={formData.password}
                            onChange={(field, value) => handleChange(field, value)}
                        />
                    )}

                    {step === 4 && (
                        <ConfirmationStep formData={formData} />
                    )}


                </div>
            </Panel>
        </>
    );
}

