import {useState} from 'react';
import CustomInput from "../../UI/CustomInput/CustomInput";
import styles from "../styles/AddNewCourse.module.css";
import PopupForm from './PopupForm';
import ResourceInterface from '../../../interfaces/resource';
import React from 'react';
import PreviewElement from './PreviewElement';
import Dropzone from '../UI/Dropzone';

import { addNewCourse } from '../../../requests/course';
import ResourceList from './ResourceList';
import { CircularProgress } from '@mui/material';

const AddNewCourse = () => {
    const [formData, setFormData] = useState<{name: string, price: number}>({name: '', price: 0});
    const [previewIcon, setPreviewIcon] = useState<File|undefined>();
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [resources, setResources] = useState<ResourceInterface[]>([]);
    const [previewElement, setPreviewElement] = useState<number>(-1);
    const [itemToEdit, setItemToEdit] = useState<ResourceInterface | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [successAdded, setSuccessAdded] = useState<number>(-1);

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
        e.preventDefault();
        e.stopPropagation();
        setItemToEdit({...resources[idx], id: idx});
        setPopupVisible(true);
    }

    const changePreviewElement = (idx: number) => {
        setPreviewElement(idx);
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

    const confirmForm = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        if(!previewIcon) return;
        await addNewCourse({name: formData.name, price: formData.price, icon: previewIcon}, resources, () => setSuccessAdded(p => p+1));
        setLoading(false);
    }

    return <>
        {popupVisible && 
            <PopupForm 
                visibilityHandler={() => {setPopupVisible(false); setItemToEdit(undefined);}} 
                saveHandler={(resource: ResourceInterface, id?: number) => {setReourceHandler(resource, id)}}
                editElement={itemToEdit}
            />
        }
        <form className={styles.form_ctx} onSubmit={confirmForm}>
            <h1 className={styles.expanded}>DODAJ NOWY KURS</h1>
            <CustomInput id="name" changeHandler={updateFormData} textLabel="Nazwa" disabled={loading} required/>
            <CustomInput id="price" type="number" changeHandler={updateFormData} textLabel="Cena" disabled={loading} required/>
            <Dropzone 
                textLabel='Miniaturka' 
                fileTypes={['jpg','png','gif','jpng']} 
                style={{gridColumn: 'span 2'}}
                updateHandler={(f: File[]) => setPreviewIcon(f[0])}
            />
            <ResourceList
                resources={resources}
                previewElement={previewElement}
                changePreviewElement={changePreviewElement}
                editHandler={editHandler}
                removeResource={removeResource}
                popupVisibleHandler={setPopupVisible}
                loading={loading}
                successAddedResources={successAdded}
            />
            <PreviewElement 
                url={previewElement > -1 ? URL.createObjectURL(resources[previewElement].file || new Blob()) : ""}
                title={previewElement > -1 ? resources[previewElement].title : ""}
                description={previewElement > -1 ? resources[previewElement].description : ""}
                task={previewElement > -1 ? resources[previewElement].task : ""}
                loading={loading}
            />
            <button className={styles.confirmation_btn} disabled={loading}>
                {loading ? <CircularProgress size="2rem"/> :'DODAJ'}
            </button>
        </form>
    </>;
}

export default AddNewCourse;