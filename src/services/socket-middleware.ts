import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from './store';
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    PayloadAction
} from '@reduxjs/toolkit';
import { getAccessToken } from '../utils/api';

type TWebSocketAction = {
    connect: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithoutPayload;
    onMessage: ActionCreatorWithPayload<any>;
    sendMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
    wsUrl: string,
    wsActions: TWebSocketAction,
    withAuth: boolean = false
): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: PayloadAction<any>) => {
            const { dispatch } = store;
            const { type } = action;
            const {
                connect,
                sendMessage,
                onOpen,
                onClose,
                onError,
                onMessage
            } = wsActions;
            if (type === connect.type) {
                const params = withAuth ? `?token=${getAccessToken()}` : '';
                socket = new WebSocket(`${wsUrl}${params}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch(onOpen());
                };

                socket.onerror = event => {
                    dispatch(onError());
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData: { success: boolean } = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch(onMessage(restParsedData));
                };

                socket.onclose = event => {
                    dispatch(onClose());
                };

                if (type === sendMessage.type) {
                    const payload = action.payload;
                    socket.send(
                        JSON.stringify({
                            ...payload
                        })
                    );
                }
            }

            next(action);
        };
    }) as Middleware;
};
