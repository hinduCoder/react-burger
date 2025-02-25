import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function load() {
            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                if (!result.success) {
                    alert('Не удалось загрузить данные');
                    console.error(result);
                }
                result.data.forEach(item => item.count = Math.trunc(Math.random() * 10));
                setData(result.data);
            } catch (e) {
                alert('Не удалось загрузить данные');
                console.error(e);
            }
        }
        
        void load();
    }, [])
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
