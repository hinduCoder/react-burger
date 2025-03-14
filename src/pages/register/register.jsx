import styles from './register.module.css';
import { useState } from 'react';
import {
    Button,
    EmailInput,
    Input,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
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
                size="medium">
                Зарегистрироваться
            </Button>
            <p className="mt-20 text text_type_main-default text_color_inactive">
                Уже зарегистрированы?{' '}
                <Link className={styles.link} to="/login">
                    Войти
                </Link>
            </p>
        </section>
    );
};

export default RegisterPage;
