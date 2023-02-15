import React, { FunctionComponent, useRef, useState } from 'react';
import CustomInput from "../../UI/CustomInput/CustomInput";
import styles from "../styles/PopupForm.module.css";
import CloseIcon from '@mui/icons-material/Close';
import Dropzone from "../UI/Dropzone";
import ResourceInterface from '../../../interfaces/resource';

interface props{
    visibilityHandler: Function,
    saveHandler?: Function,
    editElement?: ResourceInterface
}

const PopupForm: FunctionComponent<props> = ({ visibilityHandler, saveHandler, editElement }) => {
    const [video, setVideo] = useState<File | undefined>();
    const [title, setTitle] = useState<string>(editElement?.title || "");
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const taskRef = useRef<HTMLTextAreaElement>(null);

    const confirmForm = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const newResourceObj: ResourceInterface = {
            title: title,
            description: descriptionRef.current?.value || '',
            task: taskRef.current?.value || '',
            file: video || editElement?.file
        }
        saveHandler?.(newResourceObj, editElement?.id);
        visibilityHandler();
    }

    const closeHandler = (e?: React.FormEvent<HTMLElement>) => {
        if(e) e.preventDefault();
        visibilityHandler();
    }

    return <>
        <div className={styles.overlay} onClick={closeHandler}></div>
        <form className={styles.form} onSubmit={confirmForm}>
            <h1 className={styles.title__tag}>
                NOWY ZASÓB 
                <button className={styles.close__btn} onClick={closeHandler}>
                    <CloseIcon fontSize="large"/>
                </button>
            </h1>
            <CustomInput id="title" textLabel="Tytuł" changeHandler={(el: string, value: string) => setTitle(value)} value={title} required/>
            <label className={styles.task}>
                <div style={{display: 'flex', alignItems: 'center'}}>Opis<p>*</p></div>
                <textarea required ref={descriptionRef} defaultValue={editElement?.description}></textarea>
            </label>
            <label className={styles.task}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    Zadanie<p>*</p>
                </div>
                <textarea 
                    required 
                    ref={taskRef} 
                    defaultValue={editElement?.task}>
                </textarea>
            </label>
            <Dropzone 
                textLabel="Wideo" 
                fileTypes={["mp4"]} 
                updateHandler={(file: File[] | undefined) => {setVideo(file && file[0])}}
                existingVideo={editElement?.file && {url: URL.createObjectURL(editElement.file), type: true}}
            />
            <button className={styles.add__btn}>DODAJ</button>
        </form>
    </>;
}
 
export default PopupForm;