import {
    Button,
    Input,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useEffect, useState } from 'react';
import { editUser, loadUser } from '../../services/auth';
import styles from './profile-data.module.css';
import { EditUserApiRequest } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const ProfileData = () => {
    const currentUser = useAppSelector(store => store.auth.currentUser);
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setName(currentUser?.name ?? '');
        setEmail(currentUser?.email ?? '');
    }, [currentUser]);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    const resetForm = (e: FormEvent) => {
        e.preventDefault();
        setName(currentUser?.name ?? '');
        setEmail(currentUser?.email ?? '');
        setPassword('');
        setIsDirty(false);
    };
    const submitForm = (e: FormEvent) => {
        e.preventDefault();
        const updatedData: EditUserApiRequest = {
            email,
            name
        };
        if (password) {
            updatedData.password = password;
        }
        dispatch(editUser(updatedData));
        setIsDirty(false);
    };
    return (
        <form onReset={resetForm} onSubmit={submitForm}>
            <Input
                placeholder="Имя"
                icon="EditIcon"
                value={name}
                onChange={e => {
                    setName(e.target.value);
                    setIsDirty(true);
                }}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <Input
                extraClass="mt-6"
                placeholder="Логин"
                icon="EditIcon"
                value={email}
                onChange={e => {
                    setEmail(e.target.value);
                    setIsDirty(true);
                }}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <PasswordInput
                extraClass="mt-6"
                placeholder="Пароль"
                value={password}
                icon="EditIcon"
                onChange={e => {
                    setPassword(e.target.value);
                    setIsDirty(true);
                }}
            />
            {isDirty && (
                <div className={`${styles.buttons} mt-6`}>
                    <Button htmlType="reset" type="secondary" size="medium">
                        Отмена
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    );
};

export default ProfileData;
