import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loadUser } from '../../services/auth';
import PropTypes from 'prop-types';

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

AnonymousRouteElement.propTypes = {
    element: PropTypes.element.isRequired
};

export default AnonymousRouteElement;
