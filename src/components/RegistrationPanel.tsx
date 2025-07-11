import { useState, useRef } from 'react';
import { Panel, PrimaryButton, DefaultButton, mergeStyleSets, PanelType, Dialog, DialogFooter, Icon, DialogType, Spinner, on } from '@fluentui/react';
import type { RegistrationFormData } from '../models/RegistrationFormData.ts';
import { RegistrationSteps } from '../models/RegistrationSteps.ts';
import { BasicInfoStep } from './BasicInfoStep';
import { DetailsStep } from './DetailsStep';
import { AccountStep } from './AccountStep';
import { ConfirmationStep } from './ConfirmationStep';
import { verifyFormData } from '../utils/Utils.ts';
import { MockUserDataProvider } from '../providers/mockUserProvider.ts';

const styles = mergeStyleSets({
    container: {
        padding: 20,
    },
    navButtons: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 20
    },
    dialogIconSuccess: {
        color: 'green',
        marginRight: 8,
    },
    dialogIconError: {
        color: 'red',
        marginRight: 8,
    },
});

interface RegistrationPanelProps {
    isPanelOpen: boolean;
    onDismiss: () => void;
}

export function RegistrationPanel(props: RegistrationPanelProps) {
    // const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [step, setStep] = useState<RegistrationSteps>(RegistrationSteps.BasicInfo);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const stepTextRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const userDataProvider = new MockUserDataProvider();

    const dialogContentProps = {
        type: DialogType.normal,
        title: 'Submitting',
    };

    const dialogModalProps = {
        isBlocking: true,
        styles: { main: { maxWidth: 450 } },
    };

    const totalSteps = Object.keys(RegistrationSteps).length / 2;

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
        console.log('Submitting:', formData);
        setIsDialogOpen(true);
        setIsLoading(true);

        userDataProvider.saveUser(formData)
            .then(() => {
                setIsSuccess(true);
            })
            .catch(() => {
                setIsSuccess(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onDismissPanel = () => {
        setStep(RegistrationSteps.BasicInfo);
        setFormData(emptyFormData);
        setIsDialogOpen(false);
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
            {step === 1 && <DefaultButton text="Cancel" onClick={onDismissPanel} />}
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
                onDismiss={onDismissPanel}
                headerText="Registration Form for New Users"
                type={PanelType.large}
                onRenderFooterContent={onRenderFooterContent}
                closeButtonAriaLabel="Close"
                isLightDismiss={false}
            >
                <div className={styles.container}>
                    <h2 ref={stepTextRef}>Step {step} of {totalSteps}</h2>
                    {step === RegistrationSteps.BasicInfo && (
                        <BasicInfoStep
                            firstName={formData.firstName}
                            lastName={formData.lastName}
                            dateOfBirth={formData.dateOfBirth}
                            onChange={(field, value) => handleChange(field, value)}
                        />
                    )}

                    {step === RegistrationSteps.Details && (
                        <>
                            <DetailsStep
                                country={formData.country}
                                gender={formData.gender}
                                avatar=''
                                onChange={(field, value) => handleChange(field, value)}
                            />
                        </>
                    )}

                    {step === RegistrationSteps.Account && (
                        <AccountStep
                            email={formData.email}
                            password={formData.password}
                            onChange={(field, value) => handleChange(field, value)}
                        />
                    )}

                    {step === RegistrationSteps.Confirmation && (
                        <ConfirmationStep formData={formData} />
                    )}

                </div>
            </Panel>
            {isDialogOpen && (
                <Dialog
                    hidden={false}
                    onDismiss={(e) => {
                        e?.stopPropagation();
                        setIsDialogOpen(false);
                        if (isSuccess) {
                            onDismissPanel();
                        }
                    }}
                    dialogContentProps={dialogContentProps}
                    modalProps={dialogModalProps}
                >
                    {isLoading && <Spinner label="Submitting your registration..." />}
                    {!isLoading && isSuccess && (
                        <span>
                            <Icon iconName="SkypeCircleCheck" className={styles.dialogIconSuccess} />
                            Submitted Successfully.
                        </span>
                    )}
                    {!isLoading && !isSuccess && (
                        <span>
                            <Icon iconName="ErrorBadge" className={styles.dialogIconError} />
                            Submission failed. Please try again.
                        </span>
                    )}
                </Dialog>
            )}
        </>
    );
}

