import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loadUser } from '../../services/auth';

const AnonymousRouteElement = ({ element }) => {
    const { currentUser, userLoaded } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userLoaded) {
            dispatch(loadUser());
        }
    }, [dispatch, userLoaded]);

    if (!userLoaded) {
        return null;
    }

    if (currentUser) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default AnonymousRouteElement;
