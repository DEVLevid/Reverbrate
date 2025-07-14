import { InfoIcon } from '@phosphor-icons/react';
import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';

interface InputProps {
    name: string;
    value: string | number | readonly string[] | undefined;
    setValue: Dispatch<SetStateAction<any>>
    type?: string;
    placeholder?: string;
    required?: boolean;
    textArea?: boolean;
}

export default function Input({ type = "text", placeholder = "", value, setValue, name, required = false, textArea = false }: InputProps) {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>{name} {required && <InfoIcon color='#992E2E' size={16} />}</label>
            {textArea ?
                <textarea rows={6} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} className={styles.textarea} required={required} />
                :
                <input type={type} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} className={styles.input} required={required} />
            }
        </div>
    );
}