import 'jest';
import reducer, {
    register,
    login,
    loadUser,
    editUser,
    startResetPassword,
    confirmResetPassword,
    logout
} from '../auth';
import { User } from '../../utils/types';

describe('auth reducer tests', () => {
    const user: User = { name: 'John', email: 'john@example.com' };

    it('sets user on registration success', () => {
        const previousState = {
            userLoaded: false,
            currentUser: null,
            resettingPassword: false
        };
        const newState = reducer(previousState, {
            type: register.fulfilled.type,
            payload: user
        });
        expect(newState.currentUser).toEqual(user);
        expect(newState.userLoaded).toBe(true);
        expect(newState.resettingPassword).toBe(false);
    });

    it('resets user on registration fail', () => {
        console.error = jest.fn();
        window.alert = jest.fn();

        const previousState = {
            userLoaded: false,
            currentUser: user,
            resettingPassword: false
        };
        const newState = reducer(previousState, {
            type: register.rejected.type
        });
        expect(newState.currentUser).toBeNull();
        expect(newState.userLoaded).toBe(false);
    });

    it('sets user on login success', () => {
        const previousState = {
            userLoaded: false,
            currentUser: null,
            resettingPassword: false
        };
        const newState = reducer(previousState, {
            type: login.fulfilled.type,
            payload: user
        });
        expect(newState.currentUser).toEqual(user);
        expect(newState.userLoaded).toBe(true);
        expect(newState.resettingPassword).toBe(false);
    });

    it('reset user on login fail', () => {
        const previousState = {
            userLoaded: true,
            currentUser: user,
            resettingPassword: false
        };
        const newState = reducer(previousState, {
            type: login.rejected.type
        });
        expect(newState.currentUser).toBeNull();
        expect(newState.userLoaded).toBe(false);
    });

    it('sets user successfully', () => {
        const previousState = {
            userLoaded: false,
            currentUser: null,
            resettingPassword: false
        };
        const newState = reducer(previousState, {
            type: loadUser.fulfilled.type,
            payload: user
        });
        expect(newState.currentUser).toEqual(user);
        expect(newState.userLoaded).toBe(true);
    });

    it('resets user on loading error', () => {
        const previousState = {
            userLoaded: false,
            currentUser: user,
            resettingPassword: false
        };
        const newState = reducer(previousState, {
            type: loadUser.rejected.type
        });
        expect(newState.currentUser).toBeNull();
        expect(newState.userLoaded).toBe(true);
    });

    it('changes user if edited successfully', () => {
        const previousState = {
            userLoaded: true,
            currentUser: { name: 'Old', email: 'old@example.com' },
            resettingPassword: false
        };
        const newState = reducer(previousState, {
            type: editUser.fulfilled.type,
            payload: user
        });
        expect(newState.currentUser).toEqual(user);
    });

    it('sets resetting password flag', () => {
        const previousState = {
            userLoaded: false,
            currentUser: null,
            resettingPassword: false
        };
        const newState = reducer(previousState, {
            type: startResetPassword.fulfilled.type
        });
        expect(newState.resettingPassword).toBe(true);
    });

    it('resets resetting password flag on confirmation', () => {
        const previousState = {
            userLoaded: false,
            currentUser: null,
            resettingPassword: true
        };
        const newState = reducer(previousState, {
            type: confirmResetPassword.fulfilled.type
        });
        expect(newState.resettingPassword).toBe(false);
    });

    it('resets user on logout', () => {
        const previousState = {
            userLoaded: true,
            currentUser: user,
            resettingPassword: false
        };
        const newState = reducer(previousState, {
            type: logout.fulfilled.type
        });
        expect(newState.currentUser).toBeNull();
        expect(newState.userLoaded).toBe(false);
    });
});
