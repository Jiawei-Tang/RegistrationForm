import { useState } from 'react';
import { Stack, TextField, Label, Dropdown, mergeStyleSets } from '@fluentui/react';
import type { IDropdownOption } from '@fluentui/react';
import { verifyName, verifyGender } from '../utils/Utils';
import { AvatarUploader } from './AvatarUploader';

export interface AccountProps {
    country: string;
    gender: string;
    avatar: string;
    onChange: (field: string, value: string | Date | File) => void;
}

const genderOptions: IDropdownOption[] = [
    { key: 'male', text: 'Male' },
    { key: 'female', text: 'Female' }
];

const styles = mergeStyleSets({
    textInput: {
        maxWidth: '400px',
    },
    dropDown: {
        maxWidth: '200px',
    },
});

export const DetailsStep = (props: AccountProps) => {
    const [countryErrorMsg, setCountryErrorMsg] = useState('');
    const [genderErrorMsg, setGenderErrorMsg] = useState('');

    const onChangeCountry = (_: any, newValue?: string) => {
        const newName = newValue?.trim() || '';
        if (!verifyName(newName)) {
            setCountryErrorMsg('Invalid email format');
        }
        else {
            setCountryErrorMsg('');
        }
        props.onChange('country', newName);
    }

    const onChangeGender = (_: any, option?:  IDropdownOption) => {
        const newGender = option?.key as string;
        if (!newGender || !verifyGender(newGender)) {
            setGenderErrorMsg('Please select a valid gender');
        }
        else {
            setGenderErrorMsg('');
        }

        props.onChange('gender', newGender);
    }

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Label>Basic Information</Label>
            <TextField
                className={styles.textInput}
                label="Country"
                defaultValue={props.country}
                onChange={onChangeCountry}
                placeholder='Please input the name of your country'
                errorMessage={countryErrorMsg}
            />
            <Dropdown
                className={styles.dropDown}
                label="Sex (as labeled in ID)"
                options={genderOptions}
                defaultSelectedKey={props.gender}
                onChange={onChangeGender}
                errorMessage={genderErrorMsg}
                required
            />
            {/* Upload Avatar from local disk */}
            <AvatarUploader onImageChange={props.onChange} />            

        </Stack>
    )
}