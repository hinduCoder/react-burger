import styles from './register.module.css';
import { FormEvent, useState } from 'react';
import {
    Button,
    EmailInput,
    Input,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';
import { useAppDispatch, usePageTitle } from '../../utils/hooks';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    usePageTitle('Регистрация');

    const submit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(
            register({
                name,
                email,
                password
            })
        )
            .unwrap()
            .then(() => {
                navigate('/');
            });
    };

    return (
        <main className={styles.main}>
            <section className={styles.container}>
                <h2 className="text text_type_main-medium">Регистрация</h2>
                <form onSubmit={submit}>
                    <Input
                        extraClass="mt-6"
                        placeholder="Имя"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
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
                        htmlType="submit"
                        type="primary"
                        size="medium">
                        Зарегистрироваться
                    </Button>
                </form>
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
