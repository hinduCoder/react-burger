import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from './ingredient-card.module.css'

const BurgerIngredient = ({ count, name, image, price }) => {
    return <div className={styles.ingredient_card}>
        {count && <Counter count={count}/>}
        <img alt={`Ингредиент для бургера: ${name}`} src={image} className="ml-4 mr-4"/>
        <div>
            <span className="text text_type_digits-default">{price} </span>
            <CurrencyIcon type="primary"/>
        </div>
        <div className="text text_type_main-default">{name}</div>
    </div>
}

BurgerIngredient.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number
}

export default BurgerIngredient;