import React, {useEffect, useState} from 'react';

import styles from "../styles/AddNewCourse.module.css";

interface props {
    url: string,
    title: string,
    description: string,
    task: string,
    loading: boolean
}

const PreviewElement: React.FunctionComponent<props> = ({url, title, description, task, loading}) => {
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        setReload(true);
        setTimeout(() => setReload(false), 50);
    }, [url]);

    return <div className={styles.resource_wrapper}>
        <h2>Podgląd</h2>
        <div className={styles.resource_container}>
            {url && <div>
                {!reload && <video controls>
                    <source src={url}/>
                </video>}
                <div>
                    <h2>Tytuł</h2>
                    <h3>{title}</h3>
                </div>
                <div>
                    <h3>Opis</h3>
                    <p>{description}</p>
                </div>
                <div>
                    <h3>Zadanie</h3>
                    <p>{task}</p>
                </div>
            </div>}
            {!url && <h3 className={styles.info_h3}>Dodaj nowy zasób aby zobaczyć podgląd.</h3>}
        </div>
    </div>;
}
 
export default PreviewElement;