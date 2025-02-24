import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import dataType from '../../utils/data.proptypes'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import { useState } from "react";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({ bun, fillings }) => {
    const [submitted, setSubmitted] = useState(false);
    const sum = bun?.price + fillings.reduce((result, current) => result + current.price, 0);
    return (
        <section className={styles.burger_constructor}>
            {bun && <ConstructorElement
                extraClass="ml-8"
                text={`${bun.name} (верх)`}
                thumbnail={bun.image_mobile}
                price={bun.price}
                type="top"
                isLocked={true}
            />}
            <ul className={styles.list}>
                {fillings.map(item => <li key={item._id}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                        text={item.name}
                        thumbnail={item.image_mobile}
                        price={item.price}
                    />
                </li>)}
            </ul>
            {bun && <ConstructorElement
                extraClass="ml-8"
                text={`${bun.name} (низ)`}
                thumbnail={bun.image_mobile}
                price={bun.price}
                type="bottom"
                isLocked={true}
            />}
            <div className={styles.total}>
                <span className="text text_type_digits-medium">{sum} <CurrencyIcon type="primary" className={styles.total_currency_icon}/>
                </span>
                <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={() => setSubmitted(true)}>Оформить заказ</Button>
            </div>
            {submitted && <Modal onClose={() => setSubmitted(false)}>
                <OrderDetails orderNumber={'034536'} />
            </Modal>}
        </section>)
}

BurgerConstructor.propTypes = {
    bun: dataType,
    fillings: PropTypes.arrayOf(dataType)
}

export default BurgerConstructor;