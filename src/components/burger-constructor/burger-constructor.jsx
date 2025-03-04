import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { addFilling, removeFilling, setBun } from "../../services/burger-constructor";
import { closeOrderInfo, makeOrder } from "../../services/order";

const BurgerConstructor = () => {
    const { bun, fillings } = useSelector(store => store.burgerConstructor);
    const { showOrderInfo, number: orderNumber } = useSelector(store => store.order);
    
    const dispatch = useDispatch();
    
    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        
        drop({ ingredient }) {
            if (ingredient.type === 'bun') {
                dispatch(setBun(ingredient));
            } else {
                dispatch(addFilling(ingredient));
            }
        }
    })
    const sum = (bun?.price ?? 0)*2 + fillings.reduce((result, current) => result + current.price, 0);
    
    const removeIngredient = (id) => {
        dispatch(removeFilling(id))
    }
    
    return (
        <section ref={dropTarget} className={styles.burger_constructor}>
            <div>
                {bun && <ConstructorElement
                    extraClass="ml-8"
                    text={`${bun.name} (верх)`}
                    thumbnail={bun.image_mobile}
                    price={bun.price}
                    type="top"
                    isLocked={true}
                />}
            </div>
            <ul className={styles.list}>
                {fillings.map(item => <li key={item.localId}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                        text={item.name}
                        thumbnail={item.image_mobile}
                        price={item.price}
                        handleClose={() => removeIngredient(item.localId)}
                    />
                </li>)}
            </ul>
            <div>
                {bun && <ConstructorElement
                    extraClass="ml-8"
                    text={`${bun.name} (низ)`}
                    thumbnail={bun.image_mobile}
                    price={bun.price}
                    type="bottom"
                    isLocked={true}
                />}
            </div>
            <div className={styles.total}>
                <span className="text text_type_digits-medium">{sum} <CurrencyIcon type="primary" className={styles.total_currency_icon}/>
                </span>
                <Button disabled={!bun} htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={() => dispatch(makeOrder([bun._id, ...fillings.map(f => f._id)]))}>Оформить заказ</Button>
            </div>
            {showOrderInfo && <Modal onClose={() => { dispatch(closeOrderInfo())}}>
                <OrderDetails orderNumber={orderNumber} />
            </Modal>}
        </section>)
}

BurgerConstructor.propTypes = {
}

export default BurgerConstructor;