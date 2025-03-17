import styles from './register.module.css';
import { useState } from 'react';
import {
    Button,
    EmailInput,
    Input,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../services/auth';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onRegisterClick = () => {
        dispatch(
            register({
                name,
                email,
                password
            })
        ).then(result => {
            if (!result.error) {
                navigate('/');
            }
        });
    };

    return (
        <main className={styles.main}>
            <section className={styles.container}>
                <h2 className="text text_type_main-medium">Регистрация</h2>
                <Input
                    extraClass="mt-6"
                    placeholder="Имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <EmailInput
                    extraClass="mt-6"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <PasswordInput
                    extraClass="mt-6"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    icon="ShowIcon"
                />
                <Button
                    extraClass="mt-6"
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={onRegisterClick}>
                    Зарегистрироваться
                </Button>
                <p className="mt-20 text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?{' '}
                    <Link className={styles.link} to="/login">
                        Войти
                    </Link>
                </p>
            </section>
        </main>
    );
};

export default RegisterPage;
