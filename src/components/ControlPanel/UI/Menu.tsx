import { NavLink } from "react-router-dom";
import styles from "../styles/Menu.module.css";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DateRangeIcon from '@mui/icons-material/DateRange';
import NatureIcon from '@mui/icons-material/Nature';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";

const Menu = () => {
    const [isExtended, setIsExtended] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(false);

    return <div className={`${styles["menu-ctx"]} ${initialLoading && (isExtended ? styles["extended_menu"] : styles["shorten_menu"])} `}>
        <div>
            <button className={styles.button} onClick={() => {setIsExtended((prev) => !prev); setInitialLoading(true)}}>
                <MenuIcon fontSize="medium"></MenuIcon>
            </button>
        </div>
        <div className={styles["menu-ctx__options"]}>
            <NavLink to="/control-panel/new-course" className={({isActive}) => `${styles.link} ${isActive && styles.link__active}`}>
                <AddBoxIcon fontSize="large"></AddBoxIcon> | Nowy Kurs
            </NavLink>
            <NavLink to="/control-panel/sth" className={({isActive}) => `${styles.link} ${isActive && styles.link__active}`}>
                <DateRangeIcon fontSize="large"></DateRangeIcon> | Zarządzaj Datami
            </NavLink>
            <NavLink to="/control-panel/quibble-manager" className={({isActive}) => `${styles.link} ${isActive && styles.link__active}`}>
                <NatureIcon fontSize="large"></NatureIcon> | Wybiegi
            </NavLink>
        </div>
        <div className={styles.flex_end}>
            <button className={styles.logout_button}>
                <LogoutIcon fontSize="medium"></LogoutIcon> | Wyloguj
            </button>
        </div>
    </div>;
}
 
export default Menu;