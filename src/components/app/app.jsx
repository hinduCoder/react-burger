import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div className={styles.app}>
            <AppHeader />
            <Outlet />
        </div>
    );
}

export default App;
