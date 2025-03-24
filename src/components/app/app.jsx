import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MainPage from '../../pages/main/main';
import AnonymousRouteElement from '../anonymous-route-element/anonymous-route-element';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import ProfilePage from '../../pages/profile/profile';
import ProfileData from '../profile-data/profile-data';
import OrderHistory from '../order-history/order-history';
import NotFoundPage from '../../pages/not-found/not-found';
import React, { useEffect } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch } from 'react-redux';
import { loadData } from '../../services/ingredients';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadData());
    }, [dispatch]);

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
                    element={<AnonymousRouteElement element={<LoginPage />} />}
                />
                <Route
                    path="/register"
                    element={
                        <AnonymousRouteElement element={<RegisterPage />} />
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <AnonymousRouteElement
                            element={<ForgotPasswordPage />}
                        />
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <AnonymousRouteElement
                            element={<ResetPasswordPage />}
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRouteElement element={<ProfilePage />} />
                    }>
                    <Route path="/profile" element={<ProfileData />} />
                    <Route
                        path="/profile/orders"
                        element={
                            <ProtectedRouteElement element={<OrderHistory />} />
                        }
                    />
                </Route>
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
