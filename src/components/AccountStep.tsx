import { useState } from 'react';
import { Stack, TextField, Label, mergeStyleSets } from '@fluentui/react';
import { verifyEmail, verifyPasswordLength, verifyPasswordStrength } from '../utils/Utils';

export interface AccountProps {
    email: string;
    password: string;
    onChange: (field: string, value: string | Date) => void;
}

const styles = mergeStyleSets({
    textInput: {
        maxWidth: '400px',
    },
});

export const AccountStep = (props: AccountProps) => {
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const onChangeEmail = (_: any, newValue?: string) => {
        if (!newValue || !verifyEmail(newValue)) {
            setEmailErrorMsg('Invalid email format');
        }
        else {
            setEmailErrorMsg('');
        }
        props.onChange('email', newValue || '');
    }

    const onChangePassword = (_: any, newValue?: string) => {
        if (!verifyPasswordLength(newValue || '')) {
            setPasswordErrorMsg('Password must be between 8 to 30 characters long');
        }
        else if(!verifyPasswordStrength(newValue!)) {
            setPasswordErrorMsg('Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character');
        }
        else {
            setPasswordErrorMsg('');
        }
        props.onChange('password', newValue || '');
    }

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Label>Basic Information</Label>
            <TextField
                className={styles.textInput}
                label="Email"
                defaultValue={props.email}
                onChange={onChangeEmail}
                placeholder='Please input your email address'
                errorMessage={emailErrorMsg}
            />
            <TextField
                className={styles.textInput}
                label="Password"
                description='Password must be at least 8 characters long, and contain at least one number, one uppercase letter, one lowercase letter, and one special character.'
                type="password"
                canRevealPassword
                revealPasswordAriaLabel="Show password"
                defaultValue={props.password}
                onChange={onChangePassword}
                errorMessage={passwordErrorMsg}
            />
        </Stack>
    )
}