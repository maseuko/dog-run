import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

import styles from "../styles/Quibble.module.css";
import PopupForm from "./PopupForm";
import QuibbleListItem from './QuibbleListItem';

import { fetchQuibbles } from '../../../requests/quibble';
import { QuibbleResponse } from '../../../interfaces/server_responses';

const Quibble = () => {
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const [quibbles, setQuibbles] = useState<QuibbleResponse>(); 
    const [loading, setLoading] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        fetchQuibbles()
            .then(r=> {
                if(r.statusCode === "OK") setQuibbles(r);
                setLoading(false);
            });
    }, [reload]);

    return <div className={styles.ctx}>
        {popupVisible && <PopupForm visibilityHandler={() => setPopupVisible(false)} addHandler={() => setReload(prev=>!prev)} />}
        <button className={styles.add_btn} onClick={() => setPopupVisible(true)}>NOWY WYBIEG</button>
        <div>
            {loading && <CircularProgress style={{marginTop: '1rem'}}/>}
            {quibbles?.data.map((quibble, idx) => 
                <QuibbleListItem title={quibble.name} images={quibble.images} key={idx} idx={idx} deleteHandler={() => setReload(prev=>!prev)} />
            )}
        </div>
    </div>;
}

export default Quibble;