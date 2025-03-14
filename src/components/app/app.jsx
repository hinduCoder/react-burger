import React, { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch } from 'react-redux';
import { loadData } from '../../services/ingredients';
import { Outlet } from 'react-router-dom';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadData());
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
