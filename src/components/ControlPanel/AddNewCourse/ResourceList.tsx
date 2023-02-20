import { FunctionComponent } from 'react';

import ResourceInterface from '../../../interfaces/resource';
import ResourceListElement from './ResourceListElement';
import AddBoxIcon from '@mui/icons-material/AddBox';

import styles from "../styles/AddNewCourse.module.css";

interface props{
    resources: ResourceInterface[],
    previewElement: number,
    changePreviewElement: Function,
    removeResource: Function,
    editHandler: Function,
    popupVisibleHandler: Function,
    loading: boolean,
    successAddedResources: number
}

const ResourceList: FunctionComponent<props> = ({ resources, previewElement, changePreviewElement, removeResource, editHandler, popupVisibleHandler, loading,successAddedResources }) => {

    return <div className={styles.resource_wrapper}>
        <h2>Zasoby</h2>
        <div className={styles.resource_container}>
            {
                resources.map((item, idx) => {
                    return <ResourceListElement
                        idx={idx}
                        key={idx}
                        previewElement={previewElement}
                        title={item.title}
                        description={item.description}
                        changePreviewElement={changePreviewElement}
                        removeResource={removeResource}
                        editHandler={editHandler}
                        loading={loading}
                        success={idx<=successAddedResources}
                    />
                })
            }
            <button 
                className={styles.resource_btn} 
                disabled={loading}
                onClick={(e: React.FormEvent<HTMLElement>) => {e.preventDefault(); popupVisibleHandler(true);}}>
                    <AddBoxIcon fontSize="large"></AddBoxIcon>
            </button>
        </div>
    </div>;
}

export default ResourceList;