import CustomInput from "../../UI/CustomInput/CustomInput";
import styles from "../styles/PopupForm.module.css";
import Dropzone from "../UI/Dropzone";
import CloseIcon from '@mui/icons-material/Close';
import { useState, FunctionComponent } from "react";
import { POST_REQUEST } from "../../../utils/requests";
import { SERVER_URI } from "../../../constants/url";
import CircularProgress from "@mui/material/CircularProgress";

const availableFileTypes = ["jpg", "png", "webp"];

interface props{
    visibilityHandler?: Function,
    addHandler?: Function
}

const PopupForm: FunctionComponent<props> = ({visibilityHandler, addHandler}) => {
    const [quibbleName, setQuibbleName] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const closePopup = (e?: React.FormEvent<HTMLElement>) => {
        e?.preventDefault();
        e?.stopPropagation();
        visibilityHandler?.();
    }

    const submitHandler = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        const fd = new FormData();
        for(const file of files){
            fd.append("images", file);
        }
        const result = await POST_REQUEST(SERVER_URI+"/quibbles/quibble-update?name="+quibbleName, fd);
        setLoading(false);
        if(result.statusCode === "CREATED"){
            visibilityHandler?.();
            addHandler?.();
        }else{
            setError(true);
        }
    }

    return <>
        <div className={styles.overlay} onClick={closePopup}></div>
        <form className={styles.form} onSubmit={submitHandler}>
            <h1 className={styles.title__tag}>
                NOWY WYBIEG
                <button className={styles.close__btn} onClick={closePopup}>
                    <CloseIcon fontSize="large"/>
                </button>
            </h1>
            <CustomInput id="name" changeHandler={(id: string, value: string) => setQuibbleName(value)} textLabel="Nazwa wybiegu" required disabled={loading}/>
            <Dropzone textLabel="Zdjęcia" fileTypes={availableFileTypes} updateHandler={(f: File[]) => setFiles(f)} multiple/>
            {error && <p>Nie udało się dodać nowego wybiegu.</p>}
            <button className={styles.add__btn} disabled={loading}>
                {loading ? <CircularProgress/> : 'DODAJ'}
            </button>
        </form>
    </>;
}
 
export default PopupForm;