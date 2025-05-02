import { Order, OrderStatus } from '../../utils/types';
import { FC, useMemo } from 'react';
import styles from './order-info.module.css';
import { useAppSelector, usePageTitle } from '../../utils/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderInfoProps = {
    order: Order;
};

const statusDisplayNames: Record<OrderStatus, string> = {
    created: 'Создан',
    done: 'Выполнен',
    pending: 'В работе'
};

const OrderInfo: FC<TOrderInfoProps> = ({ order }) => {
    usePageTitle('Информация о заказе');

    const ingredients = useAppSelector(store => store.ingredients.list);

    const orderIngredients = useMemo(() => {
        if (ingredients.length === 0) {
            return [];
        }
        const ingredientIdCounts = order?.ingredients.reduce<{
            [id: string]: number;
        }>(
            (grouped, id) => ({
                ...grouped,
                [id]: (grouped[id] ?? 0) + 1
            }),
            {}
        )!;
        return Object.keys(ingredientIdCounts)
            .map(id => ({ ingredientId: id, count: ingredientIdCounts[id] }))
            .map(({ ingredientId, count }) => {
                const ingredient = ingredients.find(
                    ingredient => ingredient._id === ingredientId
                )!;
                return {
                    ...ingredient,
                    count: count
                };
            });
    }, [order, ingredients]);

    const sum = useMemo(() => {
        return orderIngredients.reduce(
            (sum, orderIngredient) =>
                sum + orderIngredient.price * orderIngredient.count,
            0
        );
    }, [orderIngredients]);

    if (orderIngredients.length === 0) {
        return null;
    }

    return (
        <section className={styles.container}>
            <section className={styles.card}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-medium mt-10">{order.name}</p>
                <p
                    className={`text text_type_main-default mt-3 ${styles.status}`}>
                    {statusDisplayNames[order.status]}
                </p>
                <p className="text text_type_main-medium mt-15">Состав:</p>
                <section className={styles.ingredients}>
                    {orderIngredients?.map(orderIngredient => (
                        <div
                            className={styles.ingredient}
                            key={orderIngredient._id}>
                            <div className={styles.ingredient_icon}>
                                <img src={orderIngredient.image} alt="Вкусно" />
                            </div>
                            <span
                                className={`text text_type_main-default ${styles.ingredient_name}`}>
                                {orderIngredient.name}
                            </span>
                            <span className={'text text_type_digits-default'}>
                                {orderIngredient.count} x{' '}
                                {orderIngredient.price}{' '}
                                <CurrencyIcon type="primary" />
                            </span>
                        </div>
                    ))}
                </section>
                <section className={styles.summary}>
                    <span className="text text_type_main-default text_color_inactive">
                        {order.createdAt}
                    </span>
                    <span className="text text_type_digits-default">
                        {sum} <CurrencyIcon type="primary" />
                    </span>
                </section>
            </section>
        </section>
    );
};

export default OrderInfo;
