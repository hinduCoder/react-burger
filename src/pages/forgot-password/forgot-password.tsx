import styles from './forgot-password.module.css';
import { FormEvent, useState } from 'react';
import {
    Button,
    EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, usePageTitle } from '../../utils/hooks';
import { startResetPassword } from '../../services/auth';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    usePageTitle('Восстановление пароля');

    const restorePassword = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(startResetPassword(email)).unwrap();
        navigate('/reset-password');
    };
    return (
        <main className={styles.main}>
            <section className={styles.container}>
                <h2 className="text text_type_main-medium">
                    Восстановление пароля
                </h2>
                <form onSubmit={restorePassword}>
                    <EmailInput
                        placeholder="Укажите e-mail"
                        extraClass="mt-6"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Button
                        extraClass="mt-6"
                        htmlType="submit"
                        type="primary"
                        size="medium">
                        Восстановить
                    </Button>
                </form>
                <p className="mt-20 text text_type_main-default text_color_inactive">
                    Вспомнили пароль?{' '}
                    <Link className={styles.link} to="/login">
                        Войти
                    </Link>
                </p>
            </section>
        </main>
    );
};

export default ForgotPasswordPage;
