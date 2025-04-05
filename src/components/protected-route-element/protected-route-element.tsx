import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement, useEffect } from 'react';
import { loadUser } from '../../services/auth';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

type ProtectedRouteElementProps = {
    element: ReactElement;
    mode: 'authorized' | 'anonymous';
};
const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({
    element,
    mode
}) => {
    const { currentUser, userLoaded } = useAppSelector(store => store.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!userLoaded) {
            dispatch(loadUser());
        }
    }, [dispatch, userLoaded]);

    if (!userLoaded) {
        return null;
    }

    if (mode === 'authorized' && !currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (mode === 'anonymous' && currentUser) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRouteElement;
