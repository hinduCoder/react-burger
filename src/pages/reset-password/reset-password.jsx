import styles from './reset-password.module.css';
import { useState } from 'react';
import {
    Button,
    Input,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest, confirmResetPasswordApiPath } from '../../utils/api';
import { usePageTitle } from '../../utils/hooks';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    const navigate = useNavigate();

    usePageTitle('Сброс пароля');

    const resetPassword = async () => {
        await apiRequest(confirmResetPasswordApiPath, {
            method: 'POST',
            body: JSON.stringify({
                password,
                token: confirmationCode
            })
        });
        navigate('/login');
    };
    return (
        <main className={styles.main}>
            <section className={styles.container}>
                <h2 className="text text_type_main-medium">
                    Восстановление пароля
                </h2>
                <PasswordInput
                    placeholder="Введите новый пароль"
                    extraClass="mt-6"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Input
                    placeholder="Введите код из письма"
                    extraClass="mt-6"
                    value={confirmationCode}
                    onChange={e => setConfirmationCode(e.target.value)}
                />
                <Button
                    extraClass="mt-6"
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={resetPassword}>
                    Сохранить
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

export default ResetPasswordPage;
