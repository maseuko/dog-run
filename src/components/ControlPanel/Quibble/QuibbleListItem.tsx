import { FunctionComponent, useState, useEffect } from "react";

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from '../styles/QuibbleListElement.module.css';
import ImageBox from "./ImageBox";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { deleteQuibble } from "../../../requests/quibble";

interface props{
    title: string,
    images: {url: string, id: string}[],
    idx: number,
    deleteHandler?: Function
}

const QuibbleListItem: FunctionComponent<props> = ({title, images, idx, deleteHandler}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [imgSet, setImageSet] = useState<{url: string, id: string}[]>([]);
    const [deleteBtnLoading, setDeleteBtnLoading] = useState<boolean>(false);

    const imageDeleted = (id: string) => {
        setImageSet(prev => prev.filter(i => i.id !== id));
    }

    const deleteBtnHandler = async () => {
        setDeleteBtnLoading(true);
        if(await deleteQuibble(title)) deleteHandler?.(title);
        setDeleteBtnLoading(false);
    }

    useEffect(() => setImageSet(images), []);

    return <div className={styles.item_ctx}>
        <div className={styles.header}>
                 <h2>{idx+1} | {title}</h2>
                 <div className={styles.action_btns}>
                    <button className={styles.expand_button} onClick={() => setExpanded(prev=> !prev)}>
                        {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </button>
                    <button className={styles.delete_btn} disabled={deleteBtnLoading} onClick={deleteBtnHandler}>
                        {deleteBtnLoading ? <CircularProgress size="1.5rem"/> : <DeleteIcon/>}
                    </button>
                 </div>
            
        </div>
        {
            expanded && (<div className={styles.current_images}>
                <div>
                    {imgSet.map((img, idx) => 
                        <ImageBox 
                            url={img.url} 
                            key={idx} 
                            id={img.id} 
                            deleteHandler={imageDeleted}
                        />
                    )}
                </div>
            </div>)
        }
       
        

    </div>
}

export default QuibbleListItem;