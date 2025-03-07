import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    const { name, image_large, proteins, fat, carbohydrates, calories } =
        useSelector(store => store.ingredientDetails.ingredient);
    return (
        <>
            <img
                alt={`Ингредиент для бургера: ${name}`}
                src={image_large}
                className="mb-4"
            />
            <h2 className="text text_type_main-medium mb-8">{name}</h2>
            <section className={styles.values}>
                <div className="text text_type_main-default text_color_inactive">
                    <div>Каллории, ккал</div>
                    <div className="text_type_digits-default mt-2">
                        {calories}
                    </div>
                </div>
                <div className="text text_type_main-default text_color_inactive">
                    <div>Белки, г</div>
                    <div className="text_type_digits-default mt-2">
                        {proteins}
                    </div>
                </div>
                <div className="text text_type_main-default text_color_inactive">
                    <div>Жиры, г</div>
                    <div className="text_type_digits-default mt-2">{fat}</div>
                </div>
                <div className="text text_type_main-default text_color_inactive">
                    <div>Углеводы, г</div>
                    <div className="text_type_digits-default mt-2">
                        {carbohydrates}
                    </div>
                </div>
            </section>
        </>
    );
};

export default IngredientDetails;
