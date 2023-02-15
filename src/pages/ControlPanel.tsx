import styles from './styles/ControlPanel.module.css';
import Menu from '../components/ControlPanel/UI/Menu';
import { Outlet } from 'react-router-dom';

const ControlPanel = () => {
    return <div className={styles["main-ctx"]}>
        <Menu/>
        <div className={styles.content__ctx}>
            <Outlet/>
        </div>
    </div>;
}
 
export default ControlPanel;