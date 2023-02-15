import {FunctionComponent, HTMLInputTypeAttribute} from 'react';
import styles from './styles.module.css';

interface props{
    textLabel?: String;
    type?: HTMLInputTypeAttribute;
    errorMessage?: String;
    children?: JSX.Element;
    required?: boolean;
    id: string;
    changeHandler: Function;
    disabled?: boolean,
    value?: string
}

const CustomInput: FunctionComponent<props> = ({textLabel, type, id, errorMessage, children, required, changeHandler, disabled, value}) => {

    return (
        <div className={styles.cover}>
            <label htmlFor={id}>{textLabel}{required && <p>*</p>}</label>
            <input 
                type={type} 
                id={id} 
                className={styles.input} 
                required={required} 
                onChange={e => changeHandler(id, e.target.value)}
                disabled={disabled}
                value={value}
            />
            {children}
        </div>
    );
}

export default CustomInput;