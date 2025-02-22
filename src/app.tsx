import React from 'react';
import './app.css'
import styles from './app.module.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

function App() {
  return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;
