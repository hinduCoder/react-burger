import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    const renderLink = (path, text, Icon, end = false) => {
        return (
            <NavLink
                to={path}
                end={end}
                className="pl-5 pr-5 pt-4 pb-4 mt-4 mb-4">
                {({ isActive }) => (
                    <>
                        <Icon type={isActive ? 'primary' : 'disabled'} />
                        <span
                            className={
                                isActive
                                    ? 'text_color_primary'
                                    : 'text_color_inactive'
                            }>
                            {text}
                        </span>
                    </>
                )}
            </NavLink>
        );
    };
    return (
        <header
            className={`${styles.header} text text_color_inactive text_type_main-default`}>
            <nav className={styles.menu}>
                {renderLink('/', 'Конструктор', BurgerIcon, true)}
                {renderLink('/feed', 'Лента заказов', ListIcon)}
            </nav>
            <Logo className={styles.logo} />
            <nav className={styles.menu}>
                {renderLink('/profile', 'Личный кабинет', ProfileIcon)}
            </nav>
        </header>
    );
};

export default AppHeader;
