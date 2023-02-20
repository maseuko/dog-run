import { FunctionComponent } from "react";

import styles from "../styles/AddNewCourse.module.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

interface props{
    idx: number,
    previewElement: number,
    title: string,
    description: string,
    changePreviewElement: Function,
    removeResource: Function,
    editHandler: Function,
    loading: boolean,
    success: boolean
}

const ResourceListElement: FunctionComponent<props> = ({idx, previewElement, changePreviewElement, title, removeResource, editHandler, description, loading, success}) => {
    return <div 
        className={`${styles.resource_element} ${idx === previewElement && styles.selected} ${loading && styles.loading} ${success && styles.success}`} 
        onClick={() => !loading && changePreviewElement(idx)}>
        <h3>
            {title}
            <div className={`${styles.action_ctx}`}>
                {!loading && !success ? <>
                        <button 
                            className={`${styles.edit_btn} ${idx === previewElement && styles.selected}`} 
                            onClick={(e: React.FormEvent<HTMLElement>) => editHandler(e, idx)}>
                                <ModeEditIcon/>
                        </button>
                        <button 
                            className={styles.delete_btn}
                            onClick={(e: React.FormEvent<HTMLElement>) => removeResource(e,idx)}
                        >
                            <CloseIcon fontSize="small"/>
                        </button>
                    </> : success ? <DoneIcon/> : <CircularProgress/>
                }
            </div>
        </h3>
        <p>{description}</p>
    </div>;
}
 
export default ResourceListElement;