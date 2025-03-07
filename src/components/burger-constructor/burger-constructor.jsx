import {
    ConstructorElement,
    CurrencyIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addFilling, clear, setBun } from '../../services/burger-constructor';
import { closeOrderInfo, makeOrder } from '../../services/order';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import {
    clearCounters,
    decrementCount,
    incrementCount
} from '../../services/ingredients';

const BurgerConstructor = () => {
    const { bun, fillings } = useSelector(store => store.burgerConstructor);
    const { showOrderInfo } = useSelector(store => store.order);

    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: 'ingredient',

        drop({ ingredient }) {
            if (ingredient.type === 'bun') {
                if (bun) {
                    dispatch(decrementCount(bun._id));
                }
                dispatch(setBun(ingredient));
            } else {
                dispatch(addFilling(ingredient));
            }
            dispatch(incrementCount(ingredient._id));
        }
    });
    const sum =
        (bun?.price ?? 0) * 2 +
        fillings.reduce((result, current) => result + current.price, 0);

    const onOrderClick = () => {
        dispatch(makeOrder([bun._id, ...fillings.map(f => f._id)])).then(
            result => {
                if (!result.error) {
                    dispatch(clear());
                    dispatch(clearCounters());
                }
            }
        );
    };

    return (
        <section ref={dropTarget} className={styles.burger_constructor}>
            <div>
                {bun && (
                    <ConstructorElement
                        extraClass="ml-8"
                        text={`${bun.name} (верх)`}
                        thumbnail={bun.image_mobile}
                        price={bun.price}
                        type="top"
                        isLocked={true}
                    />
                )}
            </div>
            <ul className={styles.list}>
                {fillings.map(item => (
                    <li key={item.localId}>
                        <BurgerConstructorItem item={item} />
                    </li>
                ))}
            </ul>
            <div>
                {bun && (
                    <ConstructorElement
                        extraClass="ml-8"
                        text={`${bun.name} (низ)`}
                        thumbnail={bun.image_mobile}
                        price={bun.price}
                        type="bottom"
                        isLocked={true}
                    />
                )}
            </div>
            <div className={styles.total}>
                <span className="text text_type_digits-medium">
                    {sum}{' '}
                    <CurrencyIcon
                        type="primary"
                        className={styles.total_currency_icon}
                    />
                </span>
                <Button
                    disabled={!bun}
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass="ml-10"
                    onClick={onOrderClick}>
                    Оформить заказ
                </Button>
            </div>
            {showOrderInfo && (
                <Modal
                    onClose={() => {
                        dispatch(closeOrderInfo());
                    }}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;
