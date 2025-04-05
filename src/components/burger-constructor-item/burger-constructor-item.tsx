import {
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { moveFilling, removeFilling } from '../../services/burger-constructor';
import styles from './burger-constructor-item.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { decrementCount } from '../../services/ingredients';
import { useAppDispatch } from '../../utils/hooks';
import { Ingredient } from '../../utils/types';
import { FC } from 'react';

type BurgerConstructorItemProps = {
    item: Ingredient;
};

const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({ item }) => {
    const dispatch = useAppDispatch();

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'constructorItem',
            item: { id: item.localId },
            collect: monitor => ({
                isDragging: monitor.isDragging()
            })
        }),
        [item.localId]
    );

    const [{ isHover }, drop] = useDrop<
        { id: string },
        unknown,
        { isHover: boolean }
    >(
        () => ({
            accept: 'constructorItem',
            collect: monitor => ({
                isHover: monitor.isOver()
            }),
            drop({ id: movedId }) {
                if (movedId !== item.localId) {
                    dispatch(
                        moveFilling({ fromId: movedId, toId: item.localId! })
                    );
                }
            }
        }),
        []
    );

    const removeIngredient = (item: Ingredient) => {
        dispatch(removeFilling(item.localId!));
        dispatch(decrementCount(item._id));
    };
    return (
        <div
            className={styles.constructor_item}
            ref={element => void drag(drop(element))}
            style={{ opacity: isDragging || isHover ? 0.3 : 1 }}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                thumbnail={item.image_mobile}
                price={item.price}
                handleClose={() => removeIngredient(item)}
            />
        </div>
    );
};

export default BurgerConstructorItem;
