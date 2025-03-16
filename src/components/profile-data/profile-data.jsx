import {
    EmailInput,
    Input
} from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileData = () => {
    return (
        <>
            <Input placeholder="Имя" icon="EditIcon" />
            <Input extraClass="mt-6" placeholder="Логин" icon="EditIcon" />
            <Input extraClass="mt-6" placeholder="Пароль" icon="EditIcon" />
        </>
    );
};

export default ProfileData;
