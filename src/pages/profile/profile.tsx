import styles from './profile.module.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';
import { useAppDispatch, usePageTitle } from '../../utils/hooks';

const profileLinks = [
    { route: '/profile', text: 'Профиль' },
    { route: '/profile/orders', text: 'История заказов' }
];

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    usePageTitle('Профиль');

    const signOut = async () => {
        await dispatch(logout()).unwrap();
        navigate('/login');
    };
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
                    <a
                        className={`${styles.link} text text_type_main-medium text_color_inactive`}
                        onClick={signOut}>
                        Выход
                    </a>
                </nav>
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </section>
            <section className={styles.outlet}>
                <Outlet />
            </section>
        </main>
    );
};

export default ProfilePage;
