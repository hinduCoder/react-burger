import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from './ingredient-card.module.css'
import Modal from "../modal/modal";
import { useState } from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientCard = (props) => {
    const { count, name, image, price, ...details } = props;
    const [showDetails, setShowDetails] = useState(false);
    return (
        <>
            <div className={styles.ingredient_card} onClick={() => setShowDetails(true)}>
                {count ? <Counter count={count}/> : null}
                <img alt={`Ингредиент для бургера: ${name}`} src={image} className="ml-4 mr-4"/>
                <div>
                    <span className="text text_type_digits-default">{price} </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <div className="text text_type_main-default">{name}</div>
            </div>
            {showDetails && <Modal header="Детали ингредиента" onClose={() => setShowDetails(false)}>
                <IngredientDetails {...details} name={name}  />
            </Modal>}
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