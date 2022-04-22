import { AuthRequestPromptOptions } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { action, computed, observable } from 'mobx';
import { NavigationParams } from 'react-navigation';

import { AuthenticatedUser } from '../models/AuthenticatedUser';
import { ACCOUNT_SCREEN, ENABLE_BIOMETRICS_SCREEN, SIGN_IN_SCREEN } from '../navigation/pageNames';

import jwt_decode from 'jwt-decode';

class Authentication {
    rootStore: any;
    @observable isAuthenticated: boolean = false;

    constructor(rootStore: any) {
        this.rootStore = rootStore;
    }

    isTokenExpired = (authenticatedUser: AuthenticatedUser): boolean => {
        const expiryDate = new Date(0);
        expiryDate.setUTCSeconds(authenticatedUser.issuedAt + (authenticatedUser.expiresIn || 0));

        return expiryDate < new Date();
    };

    @computed get isUserAuthenticated() {
        return this.isAuthenticated;
    }

    @action onLogin = async (
        doLoginAsync: (options?: AuthRequestPromptOptions) => Promise<AuthenticatedUser>,
        navigation: NavigationParams | undefined
    ) => {
        const authenticatedUser: AuthenticatedUser = await doLoginAsync();

        if (!this.isTokenExpired(authenticatedUser) && navigation) {
            this.isAuthenticated = true;

            // We don't need to store access token... I think...
            // await SecureStore.setItemAsync('auth-accessToken', authenticatedUser.accessToken);

            // @ts-ignore
            const decoded = jwt_decode(authenticatedUser.idToken);

            // subject is our username since i cant work out why Azure AD won't return our user profile/email despite being in scope
            await SecureStore.setItemAsync('subject', decoded.sub);
            await SecureStore.setItemAsync('auth-refreshToken', authenticatedUser.refreshToken || '');
            await SecureStore.setItemAsync('auth-idToken', authenticatedUser.idToken || '');

            const wasBiometricsPageShown = await SecureStore.getItemAsync('wasBiometricsPageShown');

            if (wasBiometricsPageShown === null || wasBiometricsPageShown === 'No') {
                navigation.navigate(ENABLE_BIOMETRICS_SCREEN);
            } else {
                navigation.navigate(ACCOUNT_SCREEN);
            }
        }
    };

    /*
        If refresh token is not null, attempt to refresh the tokens via `doRefreshTokenAction`,
        if this fails, then set `isAuthenticated` flag to false and navigate user back to `SIGN_IN_SCREEN`.
     */
    @action onRefresh = async (
        refreshAction: (refreshToken: string | null) => Promise<AuthenticatedUser>,
        navigation: NavigationParams
    ) => {
        const refreshToken = await SecureStore.getItemAsync('auth-refreshToken');

        if (refreshToken !== null && refreshToken !== '') {
            try {
                const authenticatedUser: AuthenticatedUser = await refreshAction(refreshToken);

                // Again, i _dont_ think we need access token. But i need to double check.
                // await SecureStore.setItemAsync('auth-accessToken', authenticatedUser.accessToken);

                // @ts-ignore
                const decoded = jwt_decode(authenticatedUser.idToken);

                // subject is our username since i cant work out why Azure AD won't return our user profile/email despite being in scope
                await SecureStore.setItemAsync('subject', decoded.sub);
                await SecureStore.setItemAsync('auth-idToken', authenticatedUser.idToken || '');
                this.isAuthenticated = true;
            } catch (error) {
                if (!error.message.includes('Auto discovery failed')) {
                    this.rootStore.openingApp = true;
                }
                this.isAuthenticated = false;
                navigation.navigate(SIGN_IN_SCREEN, { reason: 'failed to refresh token' });
            }
        } else {
            // If for some reason refresh token is null, we want to navigate back to `SIGN_IN_SCREEN`.
            this.isAuthenticated = false;
            this.rootStore.openingApp = true;
            navigation.navigate(SIGN_IN_SCREEN, { reason: 'refresh token is null' });
        }
    };

    /*
        This should be called when the app loads. This will attempt to refresh the token, if this
        succeeds, then the user will be taken to the `HOME` screen, skipping the login entirely,
        otherwise user will be redirected back to the `SIGN_IN_SCREEN`.
     */
    @action onAppOpen = async (
        refreshAction: (refreshToken: string | null) => Promise<AuthenticatedUser>,
        navigation: NavigationParams
    ) => {
        await this.onRefresh(refreshAction, navigation);

        if (this.isAuthenticated) {
            this.rootStore.openingApp = true;
            navigation.navigate(ACCOUNT_SCREEN);
        }
    };
}

export default Authentication;
