import { getItemAsync, setItemAsync } from 'expo-secure-store';
import MockDate from 'mockdate';
import { NavigationParams } from 'react-navigation';
import { mocked } from 'ts-jest/utils';

import { AuthenticatedUser } from '../../models/AuthenticatedUser';
import Authentication from '../authentication';
import { ACCOUNT_SCREEN, SIGN_IN_SCREEN } from '../../navigation/pageNames';

jest.mock('expo-secure-store');

describe('Authentication', () => {
    const refreshActionMock = jest.fn();
    const navigateMock = jest.fn();
    const navigationMock: NavigationParams = {
        navigate: navigateMock
    };

    const rootStoreMock = {
        openingApp: false
    };

    beforeEach(() => {
        MockDate.set('2020-06-11T20:40:30Z');
    });

    afterEach(() => {
        MockDate.reset();
        jest.clearAllMocks();
    });

    it('returns true if token is expired', () => {
        const authentication = new Authentication(null);
        const authenticatedUser: AuthenticatedUser = new AuthenticatedUser({
            accessToken: '',
            expiresIn: 60,
            issuedAt: 0
        });

        const isTokenExpired = authentication.isTokenExpired(authenticatedUser);

        expect(isTokenExpired).toEqual(true);
    });

    it('returns false if token is not expired', () => {
        const authentication = new Authentication(null);
        const authenticatedUser: AuthenticatedUser = new AuthenticatedUser({
            accessToken: '',
            expiresIn: 60,
            issuedAt: new Date().getTime()
        });

        const isTokenExpired = authentication.isTokenExpired(authenticatedUser);

        expect(isTokenExpired).toEqual(false);
    });

    it('returns false if token expiry is not set', () => {
        const authentication = new Authentication(null);
        const authenticatedUser: AuthenticatedUser = new AuthenticatedUser({
            accessToken: '',
            issuedAt: new Date().getTime()
        });

        const isTokenExpired = authentication.isTokenExpired(authenticatedUser);

        expect(isTokenExpired).toEqual(false);
    });

    it('returns flag isAuthenticated', () => {
        const authentication = new Authentication(null);
        let isUserAuthenticated = authentication.isUserAuthenticated;

        expect(isUserAuthenticated).toEqual(false);

        authentication.isAuthenticated = true;

        isUserAuthenticated = authentication.isUserAuthenticated;

        expect(isUserAuthenticated).toEqual(true);
    });

    it('performs on login action and stores tokens to secure store when token in date', async () => {
        const authentication = new Authentication(null);
        const authenticatedUser: AuthenticatedUser = new AuthenticatedUser({
            accessToken: 'accessToken',
            expiresIn: 60,
            issuedAt: new Date().getTime(),
            refreshToken: 'refreshToken',
            idToken: 'idToken'
        });

        const doLoginAsync = jest.fn();
        doLoginAsync.mockReturnValue(Promise.resolve(authenticatedUser));

        const isTokenExpiredSpy = jest.spyOn(authentication, 'isTokenExpired');

        const setItemAsyncMock = mocked(setItemAsync, true);

        await authentication.onLogin(doLoginAsync, navigationMock);

        expect(doLoginAsync).toBeCalled();
        expect(isTokenExpiredSpy).toBeCalledWith(authenticatedUser);
        expect(authentication.isAuthenticated).toEqual(true);
        expect(setItemAsyncMock).toBeCalledWith('auth-accessToken', authenticatedUser.accessToken);
        expect(setItemAsyncMock).toBeCalledWith('auth-refreshToken', authenticatedUser.refreshToken);
        expect(setItemAsyncMock).toBeCalledWith('auth-idToken', authenticatedUser.idToken);
        expect(navigateMock).toBeCalledWith(ACCOUNT_SCREEN);
    });

    it('performs on login action and stores tokens to secure store when refresh and id tokens are null', async () => {
        const authentication = new Authentication(null);
        const authenticatedUser: AuthenticatedUser = new AuthenticatedUser({
            accessToken: 'accessToken',
            expiresIn: 60,
            issuedAt: new Date().getTime()
        });

        const doLoginAsync = jest.fn();
        doLoginAsync.mockReturnValue(Promise.resolve(authenticatedUser));

        const isTokenExpiredSpy = jest.spyOn(authentication, 'isTokenExpired');

        const setItemAsyncMock = mocked(setItemAsync, true);

        await authentication.onLogin(doLoginAsync, navigationMock);

        expect(doLoginAsync).toBeCalled();
        expect(isTokenExpiredSpy).toBeCalledWith(authenticatedUser);
        expect(authentication.isAuthenticated).toEqual(true);
        expect(setItemAsyncMock).toBeCalledWith('auth-accessToken', authenticatedUser.accessToken);
        expect(setItemAsyncMock).toBeCalledWith('auth-refreshToken', '');
        expect(setItemAsyncMock).toBeCalledWith('auth-idToken', '');
        expect(navigateMock).toBeCalledWith(ACCOUNT_SCREEN);
    });

    it('does not set isAuthenticated flag if token is expired', async () => {
        const authentication = new Authentication(null);
        const authenticatedUser: AuthenticatedUser = new AuthenticatedUser({
            accessToken: 'accessToken',
            expiresIn: 60,
            issuedAt: 0,
            refreshToken: 'refreshToken',
            idToken: 'idToken'
        });

        const doLoginAsync = jest.fn();
        doLoginAsync.mockReturnValue(Promise.resolve(authenticatedUser));

        const isTokenExpiredSpy = jest.spyOn(authentication, 'isTokenExpired');

        await authentication.onLogin(doLoginAsync, navigationMock);

        expect(doLoginAsync).toBeCalled();
        expect(isTokenExpiredSpy).toBeCalledWith(authenticatedUser);
        expect(authentication.isAuthenticated).toEqual(false);
    });

    it('does not set anything in the secure store if refresh token is null', async () => {
        const refreshToken: string | null = null;

        const getItemAsyncMock = mocked(getItemAsync, true);
        const setItemAsyncMock = mocked(setItemAsync, true);

        getItemAsyncMock.mockReturnValue(Promise.resolve(refreshToken));

        const authentication = new Authentication(rootStoreMock);
        await authentication.onRefresh(refreshActionMock, navigationMock);

        expect(getItemAsyncMock).toBeCalledWith('auth-refreshToken');
        expect(setItemAsyncMock).toBeCalledTimes(0);

        expect(authentication.isAuthenticated).toEqual(false);
        expect(authentication.rootStore.openingApp).toEqual(true);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(SIGN_IN_SCREEN, { reason: 'refresh token is null' });
    });

    it('refreshes a token and sets it in the secure store', async () => {
        const refreshToken: string = 'refreshToken';
        const authenticatedUser: AuthenticatedUser = new AuthenticatedUser({
            accessToken: 'accessToken',
            expiresIn: 60,
            issuedAt: 0,
            refreshToken: 'refreshToken',
            idToken: 'idToken'
        });

        const setItemAsyncMock = mocked(setItemAsync, true);
        const getItemAsyncMock = mocked(getItemAsync, true);
        getItemAsyncMock.mockReturnValue(Promise.resolve(refreshToken));

        refreshActionMock.mockReturnValue(Promise.resolve(authenticatedUser));

        const authentication = new Authentication(null);
        await authentication.onRefresh(refreshActionMock, navigationMock);

        expect(getItemAsyncMock).toBeCalledWith('auth-refreshToken');
        expect(refreshActionMock).toBeCalledWith(refreshToken);

        await expect(setItemAsyncMock).toHaveBeenCalledTimes(2);
        await expect(setItemAsyncMock).toHaveBeenCalledWith('auth-accessToken', authenticatedUser.accessToken);
        await expect(setItemAsyncMock).toHaveBeenCalledWith('auth-idToken', authenticatedUser.idToken);
        expect(authentication.isAuthenticated).toEqual(true);
    });

    it('navigates to sign in screen if do refresh token action fails', async () => {
        const refreshToken: string | null = 'refreshToken';
        const getItemAsyncMock = mocked(getItemAsync, true);
        getItemAsyncMock.mockReturnValue(Promise.resolve(refreshToken));

        const setItemAsyncMock = mocked(setItemAsync, true);

        refreshActionMock.mockReturnValue(Promise.reject({ message: 'refresh token is invalid, expired or revoked' }));

        const authentication = new Authentication(rootStoreMock);
        await authentication.onRefresh(refreshActionMock, navigationMock);

        expect(setItemAsyncMock).toBeCalledTimes(0);

        expect(authentication.isAuthenticated).toEqual(false);
        expect(authentication.rootStore.openingApp).toEqual(true);
        await expect(navigateMock).toBeCalledTimes(1);
        await expect(navigateMock).toBeCalledWith(SIGN_IN_SCREEN, { reason: 'failed to refresh token' });
    });

    it('navigates to sign in screen if do auto discovery fails', async () => {
        const refreshToken: string | null = 'refreshToken';
        const getItemAsyncMock = mocked(getItemAsync, true);
        getItemAsyncMock.mockReturnValue(Promise.resolve(refreshToken));

        const setItemAsyncMock = mocked(setItemAsync, true);

        refreshActionMock.mockReturnValue(Promise.reject({ message: 'Auto discovery failed' }));

        const authentication = new Authentication(null);
        await authentication.onRefresh(refreshActionMock, navigationMock);

        expect(setItemAsyncMock).toBeCalledTimes(0);

        expect(authentication.isAuthenticated).toEqual(false);

        await expect(navigateMock).toBeCalledTimes(1);
        await expect(navigateMock).toBeCalledWith(SIGN_IN_SCREEN, { reason: 'failed to refresh token' });
    });

    it('attempts to refresh the tokens and navigates HOME screen', async () => {
        const authentication = new Authentication(rootStoreMock);
        const onRefreshMock = jest.spyOn(authentication, 'onRefresh');
        onRefreshMock.mockImplementation(
            async (
                refreshAction: (refreshToken: string | null) => Promise<AuthenticatedUser>,
                navigation: NavigationParams
            ) => {
                expect(refreshAction).toEqual(refreshActionMock);
                expect(navigation).toEqual(navigationMock);
                authentication.isAuthenticated = true;
            }
        );

        await authentication.onAppOpen(refreshActionMock, navigationMock);

        expect(authentication.rootStore.openingApp).toEqual(true);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(ACCOUNT_SCREEN);
    });

    it('fails to refresh the tokens', async () => {
        const authentication = new Authentication(rootStoreMock);
        const onRefreshMock = jest.spyOn(authentication, 'onRefresh');
        onRefreshMock.mockImplementation(
            async (
                refreshAction: (refreshToken: string | null) => Promise<AuthenticatedUser>,
                navigation: NavigationParams
            ) => {
                expect(refreshAction).toEqual(refreshActionMock);
                expect(navigation).toEqual(navigationMock);
                authentication.isAuthenticated = false;
            }
        );

        await authentication.onAppOpen(refreshActionMock, navigationMock);

        expect(navigateMock).toHaveBeenCalledTimes(0);
    });
});
