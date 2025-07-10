import * as React from 'react';
import { Stack, TextField, DatePicker, Label, mergeStyleSets } from '@fluentui/react';
import { verifyName } from '../utils/Utils';

export interface BasicInfoProps {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    onChange: (field: string, value: string | Date) => void;
}

const styles = mergeStyleSets({
    textInput: {
        maxWidth: '400px',
    },
    datePicker: {
        maxWidth: '200px',
    },
});

export const BasicInfoStep = (props: BasicInfoProps) => {
    const [firstNameErrorMsg, setFirstNameErrorMsg] = React.useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = React.useState('');
    const minDate = new Date("1900-01-01");
    const maxDate = new Date();

    const onChangeFirstName = (_: any, newValue?: string) => {
        if (!verifyName(newValue || '')) {
            setFirstNameErrorMsg('First name  must be between 2 and 80 characters.');
        } else {
            setFirstNameErrorMsg('');
        }
        props.onChange('firstName', newValue || '');
    }

    const onChangeLastName = (_: any, newValue?: string) => {
        if (!verifyName(newValue || '')) {
            setLastNameErrorMsg('Last name must be between 2 and 80 characters.');
        } else {
            setLastNameErrorMsg('');
        }
        props.onChange('lastName', newValue || '');
    }

    const onSelectDate = (date: Date | null | undefined) => {
        if (date) {
            props.onChange('dateOfBirth', date);
        }
    }

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Label>Basic Information</Label>
            <TextField
                className={styles.textInput}
                label="Full Name"
                defaultValue={props.firstName}
                onChange={onChangeFirstName}
                errorMessage={firstNameErrorMsg}
                required
            />
            <TextField
                className={styles.textInput}
                label="Last Name"
                defaultValue={props.lastName}
                onChange={onChangeLastName}
                errorMessage={lastNameErrorMsg}
                required
            />
            <DatePicker
                className={styles.datePicker}
                label="Date of Birth"
                value={props.dateOfBirth}
                onSelectDate={onSelectDate}
                placeholder="Select your date of birth"
                ariaLabel="Select your date of birth"
                minDate={minDate}
                maxDate={maxDate}
                isRequired
            />
        </Stack>
    );
};