import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={`${styles.header} text text_color_inactive text_type_main-default`}>
            <nav className={styles.menu}>
                <a className="pl-5 pr-5 pt-4 pb-4 mt-4 mb-4">
                    <BurgerIcon type="primary"/>
                    <span className="text_color_primary">Конструктор</span>
                </a>
                <a className="pl-5 pr-5 pt-4 pb-4 mt-4 mb-4">
                    <ListIcon type="secondary"/>
                    <span>Лента заказов</span>
                </a>
            </nav>
            <Logo className={styles.logo}/>
            <nav className={styles.menu}>
                <a className="pl-5 pr-5 pt-4 pb-4 mt-4 mb-4">
                    <ProfileIcon type="secondary" />
                    <span >Личный кабинет</span>
                </a>
            </nav>
        </header>)
}


export default AppHeader;