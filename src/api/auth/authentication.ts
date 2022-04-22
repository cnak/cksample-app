import {
    AccessTokenRequest,
    AuthRequest,
    AuthRequestConfig,
    AuthRequestPromptOptions,
    AuthSessionResult,
    DiscoveryDocument,
    RefreshTokenRequest,
    ResponseType,
    makeRedirectUri,
    useAuthRequest,
    useAutoDiscovery
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import jwt_decode from 'jwt-decode';

import { AuthenticatedUser } from '../../models/AuthenticatedUser';
import configs from '../../../configs.json';

WebBrowser.maybeCompleteAuthSession();

const getRedirectUri = (): string => {
    return makeRedirectUri({
        useProxy: false,
        preferLocalhost: false
    });
};

const { CLIENT_ID, DISCOVERY_ENDPOINT } = configs.OIDC;

const defaultAuthRequestConfig: AuthRequestConfig = {
    responseType: ResponseType.Code,
    clientId: CLIENT_ID,
    redirectUri: getRedirectUri(),
    scopes: ['openid', 'profile', 'email', 'offline_access']
};

const getDiscoveryDocument = (): DiscoveryDocument | null => {
    return useAutoDiscovery(DISCOVERY_ENDPOINT);
};

const doLoginAsyncAction = async (
    discovery: DiscoveryDocument | null,
    config: AuthRequestConfig = defaultAuthRequestConfig,
    request: AuthRequest | null,
    promptAsync: (options?: AuthRequestPromptOptions) => Promise<AuthSessionResult>
): Promise<AuthenticatedUser> => {
    const codeResponse = await promptAsync({ useProxy: false });

    if (codeResponse['error'] === null && codeResponse['type'] === 'success') {
        const tokenRequest = new AccessTokenRequest({
            clientId: CLIENT_ID,
            code: codeResponse.params.code,
            redirectUri: config.redirectUri,
            codeVerifier: request?.codeVerifier
        });

        if (discovery === null) {
            // This shouldn't happen as promptAsync won't have worked if discovery failed
            throw new Error('Auto discovery failed');
        }

        const tokenResponse = await tokenRequest.performAsync(discovery);

        // @ts-ignore
        const {exp} = jwt_decode(tokenResponse.idToken);

        return new AuthenticatedUser({ ...tokenResponse, expiresIn: exp });
    }

    throw new Error(codeResponse['error']);
};

const doRefreshTokenAction = async (
    currentRefreshToken: string | null,
    discovery: DiscoveryDocument | null,
    config: AuthRequestConfig = defaultAuthRequestConfig
): Promise<AuthenticatedUser> => {

    if (currentRefreshToken === null) {
        throw new Error('Refresh token is null');
    }

    const tokenRequest = new RefreshTokenRequest({
        clientId: config.clientId,
        refreshToken: currentRefreshToken
    });

    if (discovery === null) {
        throw new Error('Auto discovery failed');
    }

    try {
        const tokenResponse = await tokenRequest.performAsync(discovery);
        return new AuthenticatedUser(tokenResponse);
    } catch (error) {
        return Promise.reject('refresh token is invalid, expired or revoked');
    }
};

const getAuthToken = (
    config: AuthRequestConfig = defaultAuthRequestConfig
): [AuthRequest | null, (options?: AuthRequestPromptOptions) => Promise<AuthenticatedUser>] => {
    const discovery = exportFunctions.getDiscoveryDocument();

    // @ts-ignore
    const [request, response, promptAsync] = useAuthRequest(config, discovery);

    // @ts-ignore
    const doLoginAsync = async () => doLoginAsyncAction(discovery, config, request, promptAsync);

    return [request, doLoginAsync];
};

const getRefreshAction = (): ((refreshToken: string | null) => Promise<AuthenticatedUser>) => {
    const discovery: DiscoveryDocument | null = exportFunctions.getDiscoveryDocument();

    return async (refreshToken: string | null) => doRefreshTokenAction(refreshToken, discovery);
};

const exportFunctions = {
    getAuthToken,
    getRedirectUri,
    getDiscoveryDocument,
    doRefreshTokenAction,
    doLoginAsyncAction,
    getRefreshAction
};

export default exportFunctions;
