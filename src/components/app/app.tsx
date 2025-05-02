import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import ProfilePage from '../../pages/profile/profile';
import ProfileData from '../profile-data/profile-data';
import NotFoundPage from '../../pages/not-found/not-found';
import React, { useEffect } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { loadData } from '../../services/ingredients';
import { loadUser } from '../../services/auth';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import FeedPage from '../../pages/feed/feed-page';
import ProfileOrderHistory from '../profile-order-history/profile-order-history';
import OrderInfoWrapper from '../order-info-wrapper/order-info-wrapper';

function App() {
    const userLoaded = useAppSelector(store => store.auth.userLoaded);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadData());
    }, [dispatch]);

    useEffect(() => {
        if (!userLoaded) {
            dispatch(loadUser());
        }
    }, [dispatch, userLoaded]);

    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<MainPage />} />
                <Route
                    path="/ingredients/:id"
                    element={<IngredientDetails />}
                />
                <Route
                    path="/login"
                    element={
                        <ProtectedRouteElement
                            mode="anonymous"
                            element={<LoginPage />}
                        />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedRouteElement
                            mode="anonymous"
                            element={<RegisterPage />}
                        />
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <ProtectedRouteElement
                            mode="anonymous"
                            element={<ForgotPasswordPage />}
                        />
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <ProtectedRouteElement
                            mode="anonymous"
                            element={<ResetPasswordPage />}
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRouteElement
                            mode="authorized"
                            element={<ProfilePage />}
                        />
                    }>
                    <Route path="/profile" element={<ProfileData />} />
                    <Route
                        path="/profile/orders"
                        element={
                            <ProtectedRouteElement
                                mode="authorized"
                                element={<ProfileOrderHistory />}
                            />
                        }
                    />
                </Route>
                <Route
                    path="/profile/orders/:number"
                    element={<OrderInfoWrapper />}
                />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/feed/:number" element={<OrderInfoWrapper />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal
                                header="Детали ингредиента"
                                onClose={() => navigate(-1)}>
                                <IngredientDetails compact />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
}

export default App;
