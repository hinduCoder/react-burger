import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useRef, useState } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/modal';
import { hideIngredientInfo } from '../../services/ingredient-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const ingredientTypes = [
    { type: 'bun', label: 'Булки' },
    { type: 'sauce', label: 'Соусы' },
    { type: 'main', label: 'Начинки' }
];

const BurgerIngredients = () => {
    const ingredients = useSelector(store => store.ingredients.list);
    const showDetails = useSelector(
        store => store.ingredientDetails.detailsOpened
    );
    const dispatch = useDispatch();

    const [selectedIngredientType, setSelectedIngredientType] = useState('bun');
    const ingredientTypeHeaderRefs = useRef({});

    const onListScroll = e => {
        const currentTab = Object.keys(
            ingredientTypeHeaderRefs.current
        ).findLast(
            tab =>
                e.target.getBoundingClientRect().y -
                    ingredientTypeHeaderRefs.current[
                        tab
                    ].getBoundingClientRect().y >=
                0
        );
        if (currentTab !== selectedIngredientType) {
            setSelectedIngredientType(currentTab);
        }
    };

    const onTabClick = tab => {
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
                            (ingredientTypeHeaderRefs.current[
                                ingredientType.type
                            ] = element)
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
                                            ingredient={
                                                ingredient
                                            }></IngredientCard>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </section>
            {showDetails && (
                <Modal
                    header="Детали ингредиента"
                    onClose={() => dispatch(hideIngredientInfo())}>
                    <IngredientDetails />
                </Modal>
            )}
        </section>
    );
};

export default BurgerIngredients;
