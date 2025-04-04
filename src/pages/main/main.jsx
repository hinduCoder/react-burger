import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import styles from './main.module.css';
import { usePageTitle } from '../../utils/hooks';

const MainPage = () => {
    usePageTitle('Бургеры');

    return (
        <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    );
};

export default MainPage;
