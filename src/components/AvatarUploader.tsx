import { useState, useRef } from "react";
import { Persona, PersonaSize, Stack, DefaultButton, mergeStyleSets } from "@fluentui/react";

const styles = mergeStyleSets({
    fileInput: {
        display: 'none',
    },
    button: {
        maxWidth: '150px',
    },
    persona: {
        marginLeft: '20px',
    }
});

interface AvatarUploaderProps {
    onImageChange: (field: string, value: File) => void;
}

export function AvatarUploader(props: AvatarUploaderProps) {
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 300 * 1024) {
                alert('File size cannot exceed 300KB.');
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            console.log('Selected image:', imageUrl);
            setImage(file);
            setImageName(file.name);
            props.onImageChange("avatar", file);
        }
    };

    return (
        <>
            <Stack tokens={{ childrenGap: 10 }} >
                <Persona
                    className={styles.persona}
                    showUnknownPersonaCoin={!image}
                    imageUrl={image ? URL.createObjectURL(image) : undefined}
                    secondaryText={image ? imageName : "You haven't uploaded you avatar yet"}
                    size={PersonaSize.size100}
                />
                <DefaultButton
                    className={styles.button}
                    text="Uoload Avatar"
                    onClick={() => inputRef.current?.click()}
                />
                <input ref={inputRef} type="file" accept="image/*" onChange={handleImageChange} title="Upload your avator" className={styles.fileInput} />
            </Stack >
        </>
    );
}
