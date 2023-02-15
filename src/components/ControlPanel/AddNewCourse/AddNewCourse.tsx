import {useState} from 'react';
import CustomInput from "../../UI/CustomInput/CustomInput";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import styles from "../styles/AddNewCourse.module.css";
import PopupForm from './PopupForm';
import ResourceInterface from '../../../interfaces/resource';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React from 'react';
import PreviewElement from './PreviewElement';
import { TextField } from '@mui/material';

const AddNewCourse = () => {
    const [formData, setFormData] = useState({});
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [resources, setResources] = useState<ResourceInterface[]>([]);
    const [previewElement, setPreviewElement] = useState<number>(-1);
    const [itemToEdit, setItemToEdit] = useState<ResourceInterface | undefined>();
    const [reloadPreview, setReloadPreview] = useState<boolean>(false);

    const updateFormData = (id: string, value: string) => {
        setFormData(prev => {
            const newObj: any = {...prev};
            newObj[id] = value;
            return newObj;
        });
    }

    const setReourceHandler = (resource: ResourceInterface, id: number = -1) => {
        previewElement===-1&&setPreviewElement(0);
        setResources((prev) => {
            if(id>-1){
                prev[id] = resource;
                return [...prev];
            }
            return [...prev, resource]
        });
        setItemToEdit(undefined);
    }

    const editHandler = (e: React.FormEvent<HTMLElement> ,idx: number)=>{
        console.log({...resources[idx], id: idx});
        e.preventDefault();
        e.stopPropagation();
        setItemToEdit({...resources[idx], id: idx});
        setPopupVisible(true);
    }

    const changePreviewElement = (idx: number) => {
        setReloadPreview(true);
        setPreviewElement(idx);
        setTimeout(() => setReloadPreview(false), 50);
    }

    const removeResource = (e: React.FormEvent<HTMLElement> ,idx: number) => {
        e.preventDefault();
        e.stopPropagation();
        setResources((prev) => {
            prev.splice(idx, 1);
            return prev;
        });
        if(idx === previewElement) {
            changePreviewElement(previewElement - 1);
        }
    }

    return <>
        {popupVisible && 
            <PopupForm 
                visibilityHandler={() => {setPopupVisible(false); setItemToEdit(undefined);}} 
                saveHandler={(resource: ResourceInterface, id?: number) => {setReourceHandler(resource, id)}}
                editElement={itemToEdit}
            />
        }
        <form className={styles.form_ctx}>
            <h1 className={styles.expanded}>DODAJ NOWY KURS</h1>
            <CustomInput id="name" changeHandler={updateFormData} textLabel="Nazwa" required/>
            <CustomInput id="price" type="number" changeHandler={updateFormData} textLabel="Cena" required/>

            <div className={styles.resource_wrapper}>
                <h2>Zasoby</h2>
                <div className={styles.resource_container}>
                    {
                        resources.map((item, idx) => {
                            return <div 
                                key={idx} 
                                className={`${styles.resource_element} ${idx === previewElement && styles.selected}`} 
                                onClick={() => changePreviewElement(idx)}>
                                <h3>
                                    {item.title}
                                    <div className={`${styles.action_ctx} ${idx === previewElement && styles.selected}`}>
                                        <button 
                                            className={`${styles.edit_btn} ${idx === previewElement && styles.selected}`} 
                                            onClick={(e: React.FormEvent<HTMLElement>) => editHandler(e, idx)}>
                                                <ModeEditIcon/>
                                        </button>
                                        <button 
                                            className={styles.delete_btn}
                                            onClick={(e: React.FormEvent<HTMLElement>) => removeResource(e,idx)}
                                        >
                                            <CloseIcon/>
                                        </button>
                                    </div>
                                </h3>
                                <p>{item.description}</p>
                            </div>
                        })
                    }
                    <button 
                        className={styles.resource_btn} 
                        onClick={(e: React.FormEvent<HTMLElement>) => {e.preventDefault(); setPopupVisible(true);}}>
                            <AddBoxIcon fontSize="large"></AddBoxIcon>
                    </button>
                </div>
            </div>

            <div className={styles.resource_wrapper}>
                <h2>Podgląd</h2>
                <div className={styles.resource_container}>
                   {previewElement>-1 && !reloadPreview &&
                        <PreviewElement 
                            url={URL.createObjectURL(resources[previewElement].file || new Blob())}
                            title={resources[previewElement].title}
                            description={resources[previewElement].description}
                            task={resources[previewElement].task}
                        />
                    }
                </div>
            </div>

            <button className={styles.confirmation_btn}>DODAJ</button>
        </form>
    </>;
}

export default AddNewCourse;

function updateState(arg0: {}): any {
    throw new Error('Function not implemented.');
}
