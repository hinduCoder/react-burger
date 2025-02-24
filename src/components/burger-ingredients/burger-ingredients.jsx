import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import { useRef, useState } from "react";
import dataType from '../../utils/data.proptypes'
import PropTypes from "prop-types";
import IngredientCard from "../ingredient-card/ingredient-card";

const BurgerIngredients = ({ ingredients }) => {
    const [selectedIngredientType, setSelectedIngredientType] = useState('bun');
    const ingredientTypeHeaderRefs = useRef({});
    const ingredientTypes = [
        { type: 'bun', label: 'Булки' },
        { type: 'sauce', label: 'Соусы' },
        { type: 'main', label: 'Начинки' },
    ];
    
    const ingredientTypeItemsMap = new Map();
    ingredientTypes.forEach(ingredientType => ingredientTypeItemsMap.set(ingredientType.type, []));
    ingredients.forEach(item => ingredientTypeItemsMap.get(item.type).push(item));
    
    return <section className={styles.ingredients_section}>
        <h1 className="text text_type_main-large" style={{textAlign: 'left'}} >Соберите бургер</h1>
        <nav className={styles.tabs}>
            {ingredientTypes.map(tab => 
                <Tab 
                    key={tab.type} 
                    active={selectedIngredientType === tab.type} 
                    value={tab.type} 
                    onClick={() =>  {
                        setSelectedIngredientType(tab.type);
                        ingredientTypeHeaderRefs.current[tab.type].scrollIntoView({behavior: "smooth"});
                    }}>
                    {tab.label}
                </Tab>)}
        </nav>
        <section className={styles.ingredients_list}>
            {ingredientTypes.map(ingredientType => <>
                <h2 style={{textAlign: 'left'}} className="text text_type_main-medium" ref={element => ingredientTypeHeaderRefs.current[ingredientType.type] = element}>{ingredientType.label}</h2>
                <ul className={styles.ingredient_grid}>
                    {ingredients
                        .filter(ingredient => ingredient.type === ingredientType.type)
                        .map(ingredient =>
                            <li key={ingredient._id} className={styles.ingredient_card_wrapper}>
                                <IngredientCard {...ingredient}></IngredientCard>
                            </li>)}
                </ul>
        </>)}
        </section>

    </section>
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(dataType)
}

export default BurgerIngredients;