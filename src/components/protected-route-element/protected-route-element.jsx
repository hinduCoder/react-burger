import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveRoute } from '../../services/route';
import { useEffect } from 'react';
import { loadUser } from '../../services/auth';

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
        dispatch(saveRoute(location));
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRouteElement;
