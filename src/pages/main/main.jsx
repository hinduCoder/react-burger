import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import styles from './main.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadData } from '../../services/ingredients';
import { usePageTitle } from '../../utils/hooks';

const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadData());
    }, [dispatch]);

    usePageTitle('Бургеры');

    return (
        <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    );
};

export default MainPage;
