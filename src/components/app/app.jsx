import React, { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../../services/ingredients";


function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadData());
    }, [])
    
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients  />
                <BurgerConstructor />
            </main>
        </div>
  );
}

export default App;
