import orderDoneImage from '../../images/order-done.svg';
import styles from './order-details.module.css';
import { RevolvingDot } from 'react-loader-spinner';
import { useAppSelector } from '../../utils/hooks';

const OrderDetails = () => {
    const { number, loading } = useAppSelector(store => store.order);

    if (loading) {
        return (
            <RevolvingDot
                color="#4C4CFF"
                wrapperClass={styles.loader_wrapper}
            />
        );
    }
    return (
        <>
            <p className="text text_type_digits-large mb-8">{number}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img
                src={orderDoneImage}
                className={`mb-15 mt-15 ${styles.order_done_icon}`}
                alt="Hello"
            />
            <p className="text text_type_main-default">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mb-15">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    );
};

export default OrderDetails;
