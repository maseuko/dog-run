import React ,{ useState } from 'react';
import { CircularProgress } from '@mui/material';
import styles from "./styles/styles.module.css";
import CustomInput from '../UI/CustomInput/CustomInput';
import RegistrationFormInterface from '../../interfaces/registration-data-form';
import { register as registerRequest } from '../../requests/authorization';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<RegistrationFormInterface>({name: '', surname: '', email: '', password: ''});
    const [error, setError] = useState<boolean>(false);
    const [passwordsMatches, setPasswordMatches] = useState<boolean>(true);
    const navigate = useNavigate();

    const updateFormData = (id: string, value: string | boolean) => {
        setFormData(prev => {
            const newObj: any = {...prev};
            newObj[id] = value;
            return newObj;
        });
    }

    const register = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPasswordMatches(formData.password === formData["repeat-password"]);
        if(!passwordsMatches) return;
        setLoading(true);
        const result = await registerRequest(formData);
        if(result.statusCode === "EXPECTATION_FAILED"){
            setError(true);
        }else{
            navigate("/auth/registered-succesfully?mode=verify-email");
        }
        setLoading(false);
    }

    return <form className={styles.ctx} onSubmit={register}>
    <h1>ZAREJESTRUJ</h1>
    <CustomInput id="name" textLabel="Imię" required changeHandler={updateFormData} disabled={loading}/>
    <CustomInput id="surname" textLabel="Nazwisko" required changeHandler={updateFormData} disabled={loading}/>
    <CustomInput id="email" type="email" textLabel="Email" required changeHandler={updateFormData} disabled={loading}/>
    <CustomInput id="password" type="password" textLabel="Hasło" required changeHandler={updateFormData} disabled={loading}/>
    <CustomInput id="repeat-password" type="password" textLabel="Powtórz hasło" required changeHandler={updateFormData} disabled={loading}>
        <section>
            <div className={styles.infoSection}><p>*</p> - pola wymagane</div>
            <br/>
            <label>
                <input required type="checkbox"/> 
                Wyrażam zgodę na rzeczy zawarte w regulaminie, przy okazji sprzedając duszę demonowi oraz Adamowi Małyszowi.*
            </label>
        </section>
    </CustomInput>
    {error && <p>Nie udało się zarejestrować, użytkownik o podanym adresie meilowym najprawdopodobniej 
        istnieje bądź adres jest niepoprawny. Sprawdź wprowadzone dane raz jeszcze.</p>}
    {!passwordsMatches && <p>Podane hasła nie są jednakowe.</p>}
    <button type='submit' className={styles.button} disabled={loading}>
        {!loading ? 'ZAREJESTRUJ' : <CircularProgress/>}
    </button>
</form>;
}

export default SignUp;