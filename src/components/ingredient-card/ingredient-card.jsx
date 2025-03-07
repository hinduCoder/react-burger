import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { showIngredientInfo } from '../../services/ingredient-details';
import itemType from '../../utils/data.proptypes';

const IngredientCard = ({ ingredient }) => {
    const [, dragTarget] = useDrag({
        type: 'ingredient',
        item: { ingredient }
    });

    const dispatch = useDispatch();

    const { count, name, image, price } = ingredient;
    return (
        <>
            <div
                ref={dragTarget}
                className={styles.ingredient_card}
                onClick={() => dispatch(showIngredientInfo(ingredient))}>
                {count ? <Counter count={count} /> : null}
                <img
                    alt={`Ингредиент для бургера: ${name}`}
                    src={image}
                    className="ml-4 mr-4"
                />
                <div>
                    <span className="text text_type_digits-default">
                        {price}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className="text text_type_main-default">{name}</div>
            </div>
        </>
    );
};

IngredientCard.propTypes = {
    ingredient: itemType
};

export default IngredientCard;
