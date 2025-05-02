import styles from './order-history-item.module.css';
import React, { FC, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../utils/hooks';
import { Order } from '../../utils/types';
import { Link, useLocation } from 'react-router-dom';
import { toRelativeDateTimeString } from '../../utils/date-utils';

type OrderHistoryItemProps = {
    order: Order;
};

const OrderHistoryItem: FC<OrderHistoryItemProps> = ({ order }) => {
    const location = useLocation();
    const ingredients = useAppSelector(store => store.ingredients.list);

    const { images, restCount } = useMemo(() => {
        const images = order.ingredients.map(
            id => ingredients.find(ingredient => ingredient._id === id)?.image
        );

        const slicedImages = images.slice(0, 7);
        slicedImages.reverse();
        return {
            images: slicedImages,
            restCount: Math.max(images.length - 6, 0)
        };
    }, [order, ingredients]);

    const sum = useMemo(
        () =>
            order.ingredients.reduce(
                (sum, id) =>
                    sum +
                    (ingredients.find(ingredient => ingredient._id === id)
                        ?.price ?? 0),
                0
            ),
        [order, ingredients]
    );

    return (
        <Link
            to={order.number.toString()}
            state={{ background: location }}
            className={styles.link}>
            <section className={styles.card}>
                <div className={styles.card_header}>
                    <span className="text text_type_digits-default">
                        #{order.number}
                    </span>
                    <span className="text text_type_main-default text_color_inactive">
                        {toRelativeDateTimeString(order.createdAt)}
                    </span>
                </div>
                <h2 className="mt-6 mb-6 text text_type_main-medium">
                    {order.name}
                </h2>
                <div className={styles.short_details}>
                    <div
                        className={styles.ingredients}
                        style={{
                            marginRight: -16 * (images.length - 1)
                        }}>
                        {images.map((src, index) => (
                            <div
                                key={index}
                                style={{
                                    transform: `translateX(${-(images.length - 1 - index) * 16}px)`
                                }}
                                className={styles.ingredient_icon_border}>
                                <div className={styles.ingredient_icon}>
                                    <img
                                        src={src}
                                        style={{
                                            opacity:
                                                restCount && index === 0
                                                    ? 0.6
                                                    : 1
                                        }}
                                        alt="Ммм, как вкусно"
                                    />
                                    <div className="text text_type_main-default">
                                        {restCount && index === 0
                                            ? `+${restCount}`
                                            : ''}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <span className="text text_type_digits-default">
                        {sum} <CurrencyIcon type="primary" />
                    </span>
                </div>
            </section>
        </Link>
    );
};

export default OrderHistoryItem;
