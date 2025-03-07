import orderDoneImage from '../../images/order-done.svg';
import styles from './order-details.module.css';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
    const orderNumber = useSelector(store => store.order.number);

    return (
        <>
            <p className="text text_type_digits-large mb-8">{orderNumber}</p>
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
