import { UIEvent } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useRef, useState } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import { useAppSelector } from '../../utils/hooks';
import { IngredientType } from '../../utils/types';

type TabModel = {
    type: IngredientType;
    label: string;
};

type TabsRef = {
    [key in IngredientType]: HTMLElement;
};

const ingredientTypes: TabModel[] = [
    { type: 'bun', label: 'Булки' },
    { type: 'sauce', label: 'Соусы' },
    { type: 'main', label: 'Начинки' }
];

const BurgerIngredients = () => {
    const ingredients = useAppSelector(store => store.ingredients.list);

    const [selectedIngredientType, setSelectedIngredientType] = useState('bun');
    // @ts-ignore
    const ingredientTypeHeaderRefs = useRef<TabsRef>({});

    const onListScroll = (e: UIEvent<HTMLElement>) => {
        const currentTab = Object.keys(
            ingredientTypeHeaderRefs.current
        ).findLast(
            (tab: IngredientType) =>
                (e.target as HTMLElement).getBoundingClientRect().y -
                    ingredientTypeHeaderRefs.current[
                        tab
                    ].getBoundingClientRect().y >=
                0
        );
        if (currentTab !== selectedIngredientType) {
            setSelectedIngredientType(currentTab);
        }
    };

    const onTabClick = (tab: TabModel) => {
        setSelectedIngredientType(tab.type);
        ingredientTypeHeaderRefs.current[tab.type].scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <section className={styles.ingredients_section}>
            <h1 className={`text text_type_main-large ${styles.heading}`}>
                Соберите бургер
            </h1>
            <nav className={styles.tabs}>
                {ingredientTypes.map(tab => (
                    <Tab
                        key={tab.type}
                        active={selectedIngredientType === tab.type}
                        value={tab.type}
                        onClick={() => onTabClick(tab)}>
                        {tab.label}
                    </Tab>
                ))}
            </nav>
            <section
                className={styles.ingredients_list}
                onScroll={onListScroll}>
                {ingredientTypes.map(ingredientType => (
                    <div
                        key={ingredientType.type}
                        ref={element =>
                            void (ingredientTypeHeaderRefs.current[
                                ingredientType.type
                            ] = element!)
                        }>
                        <h2
                            className={`text text_type_main-medium ${styles.heading}`}>
                            {ingredientType.label}
                        </h2>
                        <ul className={styles.ingredient_grid}>
                            {ingredients
                                .filter(
                                    ingredient =>
                                        ingredient.type === ingredientType.type
                                )
                                .map(ingredient => (
                                    <li
                                        key={ingredient._id}
                                        className={
                                            styles.ingredient_card_wrapper
                                        }>
                                        <IngredientCard
                                            ingredient={ingredient}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </section>
        </section>
    );
};

export default BurgerIngredients;
