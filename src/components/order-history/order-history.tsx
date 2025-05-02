import OrderHistoryItem from '../order-history-item/order-history-item';
import { FC } from 'react';
import styles from './order-history.module.css';
import { Order } from '../../utils/types';

type TOrderHistoryProps = {
    orders: ReadonlyArray<Order>;
    onItemClick?: (number: number) => void;
};

const OrderHistory: FC<TOrderHistoryProps> = ({ orders, onItemClick }) => {
    return (
        <section className={`${styles.history} pl-2 pr-2`}>
            {orders?.map(order => (
                <OrderHistoryItem
                    key={order._id}
                    order={order}
                    onClick={onItemClick}
                />
            ))}
        </section>
    );
};

export default OrderHistory;
