import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles/styles.module.css';

const Comunicate = () => {
    const { search } = useLocation();
    const urlParams = useMemo(() => new URLSearchParams(search), [search]);

    return <div className={styles["registration-success-ctx"]}>
        
        {urlParams.get("mode") === "verify-email" && <h1>
            <p><CheckCircleOutlineIcon style={{fontSize: "5rem"}} color='success'/> Dziękujemy za rejestrację w naszym serwisie!</p>
            <p>Aby korzystać z naszych usług sprawdź swoją skrzynkę poczatową w celu weryfikacji adresu email!</p>
        </h1>}

       {urlParams.get("mode") === "email-verified" && <h1>
            <p><CheckCircleOutlineIcon style={{fontSize: "5rem"}} color='success'/> Dziękujemy za potwierdzenie adresu!</p>
            <p>Teraz już nic nie stoi na przeszkodzie, możesz się już zalogować na stronie głównej!</p>
        </h1>}

        {urlParams.get("mode") === "retrieve-password" && <h1>
            <p><CheckCircleOutlineIcon style={{fontSize: "5rem"}} color='success'/> Adres email został wysłany!</p>
            <p>Aby zmienić hasło sprawdź swoją skrzynkę odbiorczą i postępuj zgodnie z instrukcjami w wiadomości.</p>
        </h1>}

        {urlParams.get("mode") === "password-changed" && <h1>
            <p><CheckCircleOutlineIcon style={{fontSize: "5rem"}} color='success'/> Hasło zostało zmienione!</p>
            <p>Teraz możesz zalogować się do swojego konta na stronie głównej!</p>
        </h1>}
    </div>;
}

export default Comunicate;