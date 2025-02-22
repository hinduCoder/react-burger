import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import data from '../../utils/data'

const BurgerConstructor = () => {
    const bun = data.find(x => x.name.includes('Краторная булка'));   
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
            {data.map((x, i) => <li key={x._id}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    text={x.name}
                    thumbnail={x.image_mobile}
                    price={x.price}
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
    </section>
}

export default BurgerConstructor;