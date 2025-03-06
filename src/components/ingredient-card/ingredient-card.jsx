import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from './ingredient-card.module.css'
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { showIngredientInfo } from "../../services/ingredient-details";

const IngredientCard = (props) => {
    const [, dragTarget] = useDrag({
        type: 'ingredient',
        item: {ingredient: props}
    })

    const dispatch = useDispatch();
    
    const { count, name, image, price, ...details } = props;
    return (
        <>
            <div ref={dragTarget} className={styles.ingredient_card} onClick={() => dispatch(showIngredientInfo(props))}>
                {count ? <Counter count={count}/> : null}
                <img alt={`Ингредиент для бургера: ${name}`} src={image} className="ml-4 mr-4"/>
                <div>
                    <span className="text text_type_digits-default">{price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <div className="text text_type_main-default">{name}</div>
            </div>
        </>)
}

IngredientCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number,
    image_large: PropTypes.string, 
    proteins: PropTypes.number, 
    fat: PropTypes.number, 
    carbohydrates: PropTypes.number, 
    calories: PropTypes.number
}

export default IngredientCard;