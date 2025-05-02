import { FC, useEffect, useState } from 'react';
import OrderInfo from '../order-info/order-info';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
import { apiRequest, orderApiPath } from '../../utils/api';
import { Order, OrderHistoryResponse } from '../../utils/types';

const OrderInfoWrapper: FC = () => {
    const [order, setOrder] = useState<Order>();

    const { number } = useParams();

    let orders = useAppSelector(store => store.feed.orders);

    useEffect(() => {
        const requestOrder = async (number: number) => {
            const response = await apiRequest<OrderHistoryResponse>(
                `${orderApiPath}/${number}`
            );
            return response.orders[0];
        };

        const initOrder = async (number: number) => {
            let order = orders.find(order => order.number === number);
            if (!order) {
                order = await requestOrder(number);
            }
            setOrder(order);
        };

        if (!number) {
            return;
        }

        void initOrder(+number);
    }, [number, orders]);

    if (!order) {
        return null;
    }
    return <OrderInfo order={order} />;
};

export default OrderInfoWrapper;
