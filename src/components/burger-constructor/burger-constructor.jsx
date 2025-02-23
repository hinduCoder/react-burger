import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import dataType from '../../utils/data.proptypes'
import PropTypes from "prop-types";

const BurgerConstructor = ({ bun, fillings }) => {
    return <section className={styles.burger_constructor}>
        <ConstructorElement
            extraClass="ml-8"
            text={`${bun.name} (верх)`}
            thumbnail={bun.image_mobile}
            price={bun.price}
            type="top"
            isLocked={true}
        />
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
        <ConstructorElement
            extraClass="ml-8"
            text={`${bun.name} (низ)`}
            thumbnail={bun.image_mobile}
            price={bun.price}
            type="bottom"
            isLocked={true}
        />
        <div className={styles.total}>
            <span className="text text_type_digits-medium">610 <CurrencyIcon type="primary" className={styles.total_currency_icon}/>
            </span>
            <Button htmlType="button" type="primary" size="large" extraClass="ml-10">Оформить заказ</Button>
        </div>
    </section>
}

BurgerConstructor.propTypes = {
    bun: dataType,
    fillings: PropTypes.arrayOf(dataType)
}

export default BurgerConstructor;