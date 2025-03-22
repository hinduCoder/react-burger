import styles from './profile.module.css';
import { NavLink, Outlet } from 'react-router-dom';

const profileLinks = [
    { route: '/profile', text: 'Профиль' },
    { route: '/profile/orders', text: 'История заказов' },
    { route: '/sign-out', text: 'Выход' }
];

const ProfilePage = () => {
    return (
        <main className={styles.main}>
            <section className={styles.side_panel}>
                <nav className={styles.navigation_panel}>
                    {profileLinks.map(link => (
                        <NavLink
                            key={link.route}
                            to={link.route}
                            end
                            className={({ isActive }) =>
                                `${styles.link} text text_type_main-medium ` +
                                (isActive
                                    ? 'text_color_primary'
                                    : 'text_color_inactive')
                            }>
                            {link.text}
                        </NavLink>
                    ))}
                </nav>
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </section>
            <section className={styles.outlet}>
                <Outlet />
            </section>
            <section className={styles.side_panel} />
        </main>
    );
};

export default ProfilePage;
