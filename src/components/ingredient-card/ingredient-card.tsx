import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { Ingredient } from '../../utils/types';
import { FC } from 'react';

type IngredientCardProps = {
    ingredient: Ingredient;
};

const IngredientCard: FC<IngredientCardProps> = ({ ingredient }) => {
    const [, dragTarget] = useDrag({
        type: 'ingredient',
        item: { ingredient }
    });

    const location = useLocation();

    const { count, name, image, price } = ingredient;
    return (
        <Link
            to={`/ingredients/${ingredient._id}`}
            key={ingredient._id}
            state={{ background: location }}
            className={styles.link}>
            <div
                ref={element => void dragTarget(element)}
                className={styles.ingredient_card}>
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
        </Link>
    );
};

export default IngredientCard;
