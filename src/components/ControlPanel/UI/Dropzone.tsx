import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import styles from "../styles/Dropzone.module.css";
import { FILE_TYPES } from '../../../constants/file-types';

interface props{
    textLabel?: string,
    fileTypes?: string[],
    updateHandler?: Function,
    multiple?: boolean,
    existingVideo?: {url: string, type: boolean}
}

const Dropzone: FunctionComponent<props> = ({textLabel, fileTypes, updateHandler, multiple, existingVideo}) => {
    const [dragOver, setDragOver] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [urlStrings, setUrlStrings] = useState<{url: string, type: boolean}[]>(existingVideo ? [existingVideo] : []);
    const inputRef = useRef<HTMLInputElement>(null);

    const addFileToArray = (file: File, fileType: boolean) => {
        const newUrlObj = {url: URL.createObjectURL(file), type: fileType}
        setFiles((prev) => multiple ? [...prev, file] : [file]);
        setUrlStrings((prev) => multiple ? [...prev, newUrlObj] : [newUrlObj]);
    }

    const removeFileFromArray = (idx: number, e: React.FormEvent<HTMLElement>) => {
        prevent(e);
        if(!idx && idx < 0) return; 
        setFiles((prev) => {
            return [...prev.filter((item, i) => i !== idx)];
        });
        setUrlStrings((prev) => {
            return [...prev.filter((item, i) => i !== idx)];
        });
    }

    const fileSetter = (f: FileList | null) => {
        if(!f?.length) return;
        for(let i=0; i<f.length; i++){
            const fileArr = f[i].name.split(".");
            const fileType = fileArr[fileArr.length-1];
            fileTypes?.forEach((type) => {
                if(fileType === type){
                    if(FILE_TYPES.video.findIndex(t => t === fileType)>-1)
                        addFileToArray(f[i], true);
                    else
                        addFileToArray(f[i], false);
                }
            });
        }
    }

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        prevent(e);
        fileSetter(e.target.files);
    }

    const labelDropzone = (e: React.DragEvent<HTMLDivElement>) => {
        prevent(e); 
        setDragOver(false); 
        fileSetter(e?.dataTransfer.files);
    }

    const clickButtonHandler = (e: React.FormEvent<HTMLDivElement>) => {
            // prevent(e);
            e.stopPropagation();
            inputRef.current?.click();
    }

    const prevent = (e: React.FormEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
    }

    useEffect(() => updateHandler?.(files), [files]);

    return <div className={styles.dropzone__wrapper}>
        <div className={styles.label}>
            {textLabel}<p>*</p>
        </div>
        <div 
            className={`${styles.dropzone} ${dragOver && styles.drag_over} ${multiple && files.length>0 && styles.multiple}`} 
            onDragOver={(e: React.DragEvent<HTMLDivElement>)=>{prevent(e); setDragOver(true)}} 
            onDragLeave={()=>setDragOver(false)} 
            onDrop={(e: React.DragEvent<HTMLDivElement>) => labelDropzone(e)}
            onClick={(e) => clickButtonHandler(e)}
            >
            {!urlStrings.length&&<AddBoxIcon onClick={() => inputRef.current?.click()}
                fontSize="large" 
                htmlColor='grey' 
                style={{cursor: 'pointer'}}
                >
            </AddBoxIcon>}
            {
                urlStrings.map((obj, idx) => {
                    if(obj.type){
                        return <div style={{position: 'relative'}} key={idx} onClick={(e) => {e.stopPropagation()}}> 
                            <video controls >
                                <source src={obj.url} type="video/mp4"/>
                            </video>
                            <button className={styles.delete__btn} onClick={(e) => removeFileFromArray(idx, e)}><CloseIcon/></button>
                        </div>
                    }
                    
                    return <div className={styles.img_box} style={{position: 'relative'}} key={idx} onClick={(e) => {e.stopPropagation()}}>
                            <img  alt="meaningful-text" src={obj.url}/>
                            <button className={styles.delete__btn} onClick={(e) => removeFileFromArray(idx, e)}><CloseIcon/></button>
                        </div>
                })
            }
            <input type="file" style={{display: 'none'}} multiple={multiple} onChange={inputChangeHandler} ref={inputRef}/>
        </div>
    </div>;
}
 
export default Dropzone;