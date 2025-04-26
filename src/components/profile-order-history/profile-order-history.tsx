import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { connect } from '../../services/order-history';
import OrderHistory from '../../components/order-history/order-history';

const ProfileOrderHistory: FC = () => {
    const orders = useAppSelector(store => store.orderHistory.orders);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(connect());
    }, [dispatch]);

    return <OrderHistory orders={orders} />;
};

export default ProfileOrderHistory;
