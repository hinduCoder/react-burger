import OrderHistoryItem from '../order-history-item/order-history-item';
import { FC } from 'react';
import { Order } from '../../utils/types';

type TOrderHistoryProps = {
    orders: ReadonlyArray<Order>;
};

const OrderHistory: FC<TOrderHistoryProps> = ({ orders }) => {
    return (
        <section className="pl-2 pr-2">
            {orders?.map(order => (
                <OrderHistoryItem key={order._id} order={order} />
            ))}
        </section>
    );
};

export default OrderHistory;
