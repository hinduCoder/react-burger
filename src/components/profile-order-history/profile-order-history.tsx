import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { connect } from '../../services/order-history';
import OrderHistory from '../../components/order-history/order-history';
import { useNavigate } from 'react-router-dom';

const ProfileOrderHistory: FC = () => {
    const orders = useAppSelector(store => store.orderHistory.orders);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(connect());
    }, [dispatch]);

    const onItemClick = (number: number) => {
        navigate(number.toString());
    };

    return <OrderHistory orders={orders} onItemClick={onItemClick} />;
};

export default ProfileOrderHistory;
