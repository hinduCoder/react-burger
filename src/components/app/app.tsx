import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import data from "../../utils/data";

function App() {
    const bun = data.find(item => item.type === 'bun');
    const fillings = data
        .filter(item => item.type === 'main')
        .slice(0, 3)
        .concat(data.filter(item => item.type === 'sauce').slice(0, 3));

    return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor bun={bun} fillings={fillings} />
        </main>
    </div>
  );
}

export default App;
