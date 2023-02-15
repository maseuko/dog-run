import styles from './styles/styles.module.css';
import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import CustomInput from '../UI/CustomInput/CustomInput';
import { retrievePassword } from '../../requests/authorization';
import { SignInInterface } from '../../interfaces/sign-data-form';
import { useNavigate } from 'react-router-dom';

const RetrievePassword = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<SignInInterface>({email: ""});
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();

    const updateFormData = (id: string, value: string | boolean) => {
        setFormData(prev => {
            const newObj: any = {...prev};
            newObj[id] = value;
            return newObj;
        });
    }

    const submitForm = async (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(false);
        if(await retrievePassword(formData)) navigate("/auth/registered-succesfully?mode=retrieve-password");
        setLoading(false);
        setError(true);
    }

    return <form className={styles.ctx} onSubmit={submitForm}>
    <h1>ODZYSKAJ HASŁO</h1>
    <CustomInput id="email" textLabel="Email" changeHandler={updateFormData} disabled={loading}/>
    {error && <p>Podany adres email nie istnieje.</p>}
    <button type='submit' className={styles.button} disabled={loading} style={{marginTop: '1rem'}}>
        {!loading ? 'ODZYSKAJ' : <CircularProgress/>}
    </button>
</form>;
}

export default RetrievePassword;