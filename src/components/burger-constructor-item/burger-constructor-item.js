import {
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { moveFilling, removeFilling } from '../../services/burger-constructor';
import { useDispatch } from 'react-redux';
import styles from './burger-constructor-item.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { decrementCount } from '../../services/ingredients';
import itemType from '../../utils/data.proptypes';

const BurgerConstructorItem = ({ item }) => {
    const dispatch = useDispatch();

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

    const [{ isHover }, drop] = useDrop(
        () => ({
            accept: 'constructorItem',
            collect: monitor => ({
                isHover: monitor.isOver()
            }),
            drop({ id: movedId }) {
                if (movedId !== item.localId) {
                    dispatch(
                        moveFilling({ fromId: movedId, toId: item.localId })
                    );
                }
            }
        }),
        []
    );

    const removeIngredient = item => {
        dispatch(removeFilling(item.localId));
        dispatch(decrementCount(item._id));
    };
    return (
        <div
            className={styles.constructor_item}
            ref={element => drag(drop(element))}
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

BurgerConstructorItem.propTypes = {
    item: itemType
};

export default BurgerConstructorItem;
