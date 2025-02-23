import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/data'
import styles from './burger-ingredients.module.css'
import { useState } from "react";
const BurgerIngredients = () => {
    const [selectedIngredientType, setSelectedIngredientType] = useState('bun');
    const ingredientTypes = [
        { type: 'bun', label: 'Булки' },
        { type: 'sauce', label: 'Соусы' },
        { type: 'main', label: 'Начинки' },
    ];
    
    const ingredientTypeItemsMap = new Map();
    ingredientTypes.forEach(ingredientType => ingredientTypeItemsMap.set(ingredientType.type, []));
    data.forEach(item => ingredientTypeItemsMap.get(item.type).push(item));
    
    return <section className={styles.ingredients_section}>
        <h1 className="text text_type_main-large" style={{textAlign: 'left'}}>Соберите бургер</h1>
        <nav className={styles.tabs}>
            {ingredientTypes.map(tab => 
                <Tab 
                    key={tab.type} 
                    active={selectedIngredientType === tab.type} 
                    value={tab.type} 
                    onClick={() => setSelectedIngredientType(tab.type)}>
                    {tab.label}
                </Tab>)}
        </nav>
        <section className={styles.ingredients_list}>
            {ingredientTypes.map(ingredientType => <>
                <h2 style={{textAlign: 'left'}} className="text text_type_main-medium">{ingredientType.label}</h2>
                <ul className={styles.ingredient_grid}>
                    {data
                        .map(ingredient =>
                            <li key={ingredient._id} className={styles.ingredient_card}>
                                {ingredient.count && <Counter count={ingredient.count}/>}
                                <img alt={ingredient.name} src={ingredient.image} className="ml-4 mr-4"/>
                                <div>
                                    <span className="text text_type_digits-default">{ingredient.price} </span>
                                    <CurrencyIcon type="primary"/>
                                </div>
                                <div className="text text_type_main-default">{ingredient.name}</div>
                            </li>)}
                </ul>
        </>)}
        </section>

    </section>
}

export default BurgerIngredients;