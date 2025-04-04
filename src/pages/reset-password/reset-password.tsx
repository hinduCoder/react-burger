import styles from './reset-password.module.css';
import { FormEvent, useState } from 'react';
import {
    Button,
    Input,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
    useAppDispatch,
    useAppSelector,
    usePageTitle
} from '../../utils/hooks';
import { confirmResetPassword } from '../../services/auth';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    const resetting = useAppSelector(state => state.auth.resettingPassword);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    usePageTitle('Сброс пароля');

    const resetPassword = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(
            confirmResetPassword({ password, confirmationCode })
        ).unwrap();
        navigate('/login');
    };

    if (!resetting) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className={styles.main}>
            <section className={styles.container}>
                <h2 className="text text_type_main-medium">
                    Восстановление пароля
                </h2>
                <form onSubmit={resetPassword}>
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
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                    <Button
                        extraClass="mt-6"
                        htmlType="submit"
                        type="primary"
                        size="medium">
                        Сохранить
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

export default ResetPasswordPage;
