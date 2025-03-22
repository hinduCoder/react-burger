import styles from './forgot-password.module.css';
import { useState } from 'react';
import {
    Button,
    EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest, startResetPasswordApiPath } from '../../utils/api';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const restorePassword = async () => {
        await apiRequest(startResetPasswordApiPath, {
            method: 'POST',
            body: JSON.stringify({
                email
            })
        });
        navigate('/reset-password');
    };
    return (
        <main className={styles.main}>
            <section className={styles.container}>
                <h2 className="text text_type_main-medium">
                    Восстановление пароля
                </h2>
                <EmailInput
                    placeholder="Укажите e-mail"
                    extraClass="mt-6"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Button
                    extraClass="mt-6"
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={restorePassword}>
                    Восстановить
                </Button>
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
