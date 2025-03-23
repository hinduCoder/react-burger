import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import store from './services/store';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LoginPage from './pages/login/login';
import MainPage from './pages/main/main';
import RegisterPage from './pages/register/register';
import ForgotPasswordPage from './pages/forgot-password/forgot-password';
import ResetPasswordPage from './pages/reset-password/reset-password';
import ProfilePage from './pages/profile/profile';
import ProfileData from './components/profile-data/profile-data';
import OrderHistory from './components/order-history/order-history';
import ProtectedRouteElement from './components/protected-route-element/protected-route-element';
import AnonymousRouteElement from './components/anonymous-route-element/anonymous-route-element';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <Router>
                    <Routes>
                        <Route element={<App />}>
                            <Route path="/" element={<MainPage />} />
                            <Route
                                path="/login"
                                element={
                                    <AnonymousRouteElement
                                        element={<LoginPage />}
                                    />
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <AnonymousRouteElement
                                        element={<RegisterPage />}
                                    />
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
                                    <ProtectedRouteElement
                                        element={<ProfilePage />}
                                    />
                                }>
                                <Route
                                    path="/profile"
                                    element={<ProfileData />}
                                />
                                <Route
                                    path="/profile/orders"
                                    element={
                                        <ProtectedRouteElement
                                            element={<OrderHistory />}
                                        />
                                    }
                                />
                            </Route>
                        </Route>
                    </Routes>
                </Router>
            </DndProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
