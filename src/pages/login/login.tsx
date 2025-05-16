import {
    Button,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import styles from './login.module.css';
import { login } from '../../services/auth';
import { useAppDispatch, usePageTitle } from '../../utils/hooks';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    usePageTitle('Авторизация');

    const submit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(
            login({
                email,
                password
            })
        )
            .unwrap()
            .then(() => {
                navigate(location.state?.from ?? '/', {
                    replace: true
                });
            });
    };

    return (
        <main className={styles.main}>
            <section className={styles.container}>
                <h2 className="text text_type_main-medium">Вход</h2>
                <form onSubmit={submit}>
                    <EmailInput
                        name="email"
                        data-cy="email_input"
                        extraClass="mt-6"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        name="password"
                        data-cy="password_input"
                        extraClass="mt-6"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        icon="ShowIcon"
                    />
                    <Button
                        extraClass="mt-6"
                        htmlType="submit"
                        type="primary"
                        size="medium">
                        Войти
                    </Button>
                </form>
                <p className="mt-20 text text_type_main-default text_color_inactive">
                    Вы — новый пользователь?{' '}
                    <Link className={styles.link} to="/register">
                        Зарегистрироваться
                    </Link>
                </p>
                <p className="mt-4 text text_type_main-default text_color_inactive">
                    Забыли пароль?{' '}
                    <Link className={styles.link} to="/forgot-password">
                        Восстановить пароль
                    </Link>
                </p>
            </section>
        </main>
    );
};

export default LoginPage;
