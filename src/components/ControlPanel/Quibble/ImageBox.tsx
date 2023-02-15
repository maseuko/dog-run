import {FunctionComponent, useRef} from 'react';

import styles from '../styles/ImageBox.module.css';

import DeleteIcon from '@mui/icons-material/Delete';
import { deleteImage } from '../../../requests/quibble';

interface props{
    url: string,
    id: string,
    deleteHandler?: Function
}

const ImageBox: FunctionComponent<props> = ({url, id, deleteHandler}) => {
    const deleteHandlerButton = async () => {
        if(await deleteImage(id)) deleteHandler?.(id);
    }
    const imgRef = useRef<HTMLImageElement>(null);
    return <div className={styles.image_box_ctx}>
        <img src={url} ref={imgRef}/>
        <button className={styles.remove_btn} onClick={deleteHandlerButton}>
            USUŃ <DeleteIcon fontSize='small'/>
        </button>
    </div>;
}
 
export default ImageBox;