import CustomInput from '../UI/CustomInput/CustomInput';
import styles from './styles/styles.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkForKeyValidity, savePasswordRequest } from '../../requests/authorization';

const RenewPassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [initialLoader, setInitialLoader] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const {search} = useLocation();
    const navigate = useNavigate();

    const urlParams = useMemo(() => new URLSearchParams(search), [search]);

    useEffect(()=>{
        const obj: {key: string, u: string} = {
            key: urlParams.get("key") || "",
            u: urlParams.get("u") || ""
        };
        checkForKeyValidity(obj)
            .then(res => {
                if(res) setInitialLoader(false);
                else navigate("/auth/");
            })
            .catch(err => console.log(err));
    }, []);

    const checkForPasswordMatch = (id: string, repeatedPassword: string): boolean => {
        setError(false);
        if(newPassword !== repeatedPassword){ setError(true); return false; };
        return true;
    }

    const savePassword = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            key: urlParams.get("key") || "",
            user: urlParams.get("u") || "",
            password: newPassword
        }
        
        if(await savePasswordRequest(data)) navigate("/auth/registered-succesfully?mode=password-changed");
        setLoading(false);
    }

    return <form className={styles.ctx} onSubmit={savePassword}>
        {initialLoader && <CircularProgress size="5rem" style={{margin: 'auto', position: 'absolute', inset: '0 0 0 0'}} color="inherit"/>}
        {!initialLoader && <>
            <h1>Ustaw nowe hasło</h1>
            <CustomInput id='new-password' type='password' textLabel='Hasło' required changeHandler={(id: string, input: string) => setNewPassword(input)}/>
            <CustomInput id='repeat-password' type='password' textLabel='Powtórz hasło' required changeHandler={checkForPasswordMatch}/>
            {error&&<p>Hasła nie są identyczne.</p>}
            <button type='submit' className={styles.button} disabled={loading || error}>
                {!loading ? 'ZMIEŃ' : <CircularProgress/>}
            </button></>
        }
    </form>;
}

export default RenewPassword;