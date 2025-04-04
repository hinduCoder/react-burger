import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from '../../services/auth';
import PropTypes from 'prop-types';

const ProtectedRouteElement = ({ element }) => {
    const { currentUser, userLoaded } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!userLoaded) {
            dispatch(loadUser());
        }
    }, [dispatch, userLoaded]);

    if (!userLoaded) {
        return null;
    }

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return element;
};

ProtectedRouteElement.propTypes = {
    element: PropTypes.element.isRequired
};

export default ProtectedRouteElement;
