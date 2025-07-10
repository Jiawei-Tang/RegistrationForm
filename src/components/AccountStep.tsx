import { useState } from 'react';
import { Stack, TextField, Label, mergeStyleSets } from '@fluentui/react';
import { verifyEmail, verifyPassword } from '../utils/Utils';

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
        if (!verifyPassword(newValue || '')) {
            setPasswordErrorMsg('Password must be between 8 to 30 characters long');
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
                description='Password must be at least 8 characters long'
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