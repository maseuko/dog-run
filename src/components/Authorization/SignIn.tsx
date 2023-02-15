import { CircularProgress } from '@mui/material';
import Link from '@mui/material/Link';
import React, { useState } from 'react';
import { SignInInterface } from '../../interfaces/sign-data-form';
import CustomInput from '../UI/CustomInput/CustomInput';
import styles from './styles/styles.module.css';
import {signIn as signInRequest} from '../../requests/authorization';
import { getAuthorizationCookies } from '../../utils/authorization';
import { useDispatch } from 'react-redux';
import { setLoggedState, setTokens } from '../../redux/authentication';

 const SignIn = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<SignInInterface>({email: '', password: ''});
    const [error, setError] = useState<boolean>(false);
    const dispatch = useDispatch();

    const updateFormData = (id: string, value: string | boolean) => {
        setFormData(prev => {
            const newObj: any = {...prev};
            newObj[id] = value;
            return newObj;
        });
    }

    const signIn = async (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(false);
        if(!await signInRequest(formData)) {setError(true); setLoading(false); return;};
        const auth = getAuthorizationCookies();
        dispatch(setTokens(auth));
        dispatch(setLoggedState(true));
        setLoading(false);
    }

    return <form className={styles.ctx} onSubmit={signIn}>
        <h1>ZALOGUJ</h1>
        <CustomInput id="email" textLabel="Email" type="email" changeHandler={updateFormData} disabled={loading}/>
        <CustomInput id="password" textLabel="Hasło" type="password" changeHandler={updateFormData} disabled={loading}>
            <p style={{color: "black"}}>
                Zapomniałeś hasła? <Link href='/auth/retrieve-password'>Odzyskaj je tutaj!</Link>
                <br/>
                Nie masz konta? <Link href='/auth/sign-up'>Zrejestruj się!</Link>
            </p>
        </CustomInput>
        {error&&<p>Nieprawidłowe dane logowania.</p>}
        <button type='submit' className={styles.button} disabled={loading}>
            {!loading ? 'ZALOGUJ' : <CircularProgress/>}
        </button>
    </form>;
}
 
export default SignIn;