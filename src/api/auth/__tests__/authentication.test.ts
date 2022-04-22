import {
    AccessTokenRequest,
    AuthRequestConfig,
    DiscoveryDocument,
    RefreshTokenRequest,
    ResponseType,
    makeRedirectUri,
    useAuthRequest,
    useAutoDiscovery
} from 'expo-auth-session';
import { mocked } from 'ts-jest/utils';

import { AuthenticatedUser } from '../../../models/AuthenticatedUser';
import auth from '../authentication';

jest.mock('expo-auth-session');

jest.mock('../../../../configs.json', () => ({
    OIDC: {
        DISCOVERY_ENDPOINT: 'https://some-discovery.com/endpoint',
        CLIENT_ID: '1111222233334444'
    }
}));

const expectedDiscoveryDocument: DiscoveryDocument = {
    authorizationEndpoint: 'https://test.test',
    tokenEndpoint: 'https://test.test'
};

const expectedRedirectUri = 'exp://exp.host/@test/fb-smart-freight-operator';

const expectedAuthRequestConfig: AuthRequestConfig = {
    responseType: ResponseType.Token,
    clientId: '1111222233334444',
    redirectUri: 'exp://exp.host/@test/fb-smart-freight-operator',
    scopes: ['openid']
};

const expectedAuthenticatedUser: AuthenticatedUser = {
    accessToken: 'accessToken',
    expiresIn: 60,
    refreshToken: 'refreshToken',
    scope: 'openid',
    state: 'state',
    idToken: 'idToken',
    issuedAt: 1550550
};

const assertAuthenticatedUser = (authenticatedUser: AuthenticatedUser) => {
    expect(authenticatedUser.accessToken).toEqual('accessToken');
    expect(authenticatedUser.expiresIn).toEqual(60);
    expect(authenticatedUser.refreshToken).toEqual('refreshToken');
    expect(authenticatedUser.scope).toEqual('openid');
    expect(authenticatedUser.state).toEqual('state');
    expect(authenticatedUser.idToken).toEqual('idToken');
    expect(authenticatedUser.issuedAt).toEqual(1550550);
};

describe('Authentication Sessions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns a correct redirect url', () => {
        const makeRedirectUriMock = mocked(makeRedirectUri, true);
        makeRedirectUriMock.mockReturnValue(expectedRedirectUri);

        const redirectUri = auth.getRedirectUri();

        expect(makeRedirectUriMock).toBeCalled();
        expect(makeRedirectUriMock).toBeCalledWith({
            useProxy: false,
            preferLocalhost: false
        });

        expect(redirectUri).toEqual(expectedRedirectUri);
    });

    it('returns a discovery document', () => {
        const useAutoDiscoveryMock = mocked(useAutoDiscovery, true);
        useAutoDiscoveryMock.mockReturnValue(expectedDiscoveryDocument);

        const discoveryDocument = auth.getDiscoveryDocument();

        expect(useAutoDiscoveryMock).toBeCalled();
        expect(useAutoDiscoveryMock).toBeCalledWith('https://some-discovery.com/endpoint');
        expect(discoveryDocument).toEqual(expectedDiscoveryDocument);
    });

    it('performs a login action', async () => {
        const promptAsyncMock = jest.fn().mockImplementation(() => ({
            error: null,
            type: 'success',
            params: {
                code: 'code'
            }
        }));

        const performAsyncMock = jest.fn().mockImplementation(() => ({
            accessToken: 'accessToken',
            expiresIn: 60,
            refreshToken: 'refreshToken',
            scope: 'openid',
            state: 'state',
            idToken: 'idToken',
            issuedAt: 1550550
        }));

        const accessTokenRequestMock = mocked(AccessTokenRequest, true);
        // @ts-ignore
        accessTokenRequestMock.mockImplementation(() => {
            return {
                performAsync: performAsyncMock
            };
        });

        const authenticatedUser = await auth.doLoginAsyncAction(
            expectedDiscoveryDocument,
            expectedAuthRequestConfig,
            null,
            promptAsyncMock
        );

        expect(promptAsyncMock).toBeCalled();
        expect(promptAsyncMock).toBeCalledWith({ useProxy: false });

        expect(performAsyncMock).toBeCalled();
        expect(performAsyncMock).toBeCalledWith(expectedDiscoveryDocument);

        expect(accessTokenRequestMock).toBeCalledWith({
            clientId: '1111222233334444',
            code: 'code',
            codeVerifier: undefined,
            redirectUri: expectedRedirectUri
        });

        assertAuthenticatedUser(authenticatedUser);
    });

    it('login action throws an error when discovery document is null', async () => {
        const promptAsyncMock = jest.fn().mockImplementation(() => ({
            error: null,
            type: 'success',
            params: {
                code: 'code'
            }
        }));

        await expect(auth.doLoginAsyncAction(null, expectedAuthRequestConfig, null, promptAsyncMock)).rejects.toThrow(
            /Auto discovery failed/
        );
    });

    it('throws an error when code response returns an error', async () => {
        const promptAsyncMock = jest.fn().mockImplementation(() => ({
            error: 'some error',
            type: 'success',
            params: {
                code: 'code'
            }
        }));

        await expect(auth.doLoginAsyncAction(null, expectedAuthRequestConfig, null, promptAsyncMock)).rejects.toThrow(
            /some error/
        );
    });

    it('performs a refresh token action', async () => {
        const performAsyncMock = jest.fn().mockImplementation(() => ({
            accessToken: 'accessToken',
            expiresIn: 60,
            refreshToken: 'refreshToken',
            scope: 'openid',
            state: 'state',
            idToken: 'idToken',
            issuedAt: 1550550
        }));

        const refreshTokenRequestMock = mocked(RefreshTokenRequest, true);
        // @ts-ignore
        refreshTokenRequestMock.mockImplementation(() => {
            return {
                performAsync: performAsyncMock
            };
        });

        const refreshedAuthenticatedUser = await auth.doRefreshTokenAction(
            'refreshToken',
            expectedDiscoveryDocument,
            expectedAuthRequestConfig
        );

        expect(refreshTokenRequestMock).toBeCalledWith({
            clientId: '1111222233334444',
            refreshToken: 'refreshToken'
        });
        expect(performAsyncMock).toBeCalledWith(expectedDiscoveryDocument);

        assertAuthenticatedUser(refreshedAuthenticatedUser);
    });

    it('refresh action throws an error when discovery document is null', async () => {
        await expect(auth.doRefreshTokenAction('refreshToken', null, expectedAuthRequestConfig)).rejects.toThrow(
            /Auto discovery failed/
        );
    });

    it('refresh action throws an error when refresh token is null', async () => {
        await expect(
            auth.doRefreshTokenAction(null, expectedDiscoveryDocument, expectedAuthRequestConfig)
        ).rejects.toThrow(/Refresh token is null/);
    });

    it('returns a function to get the auth token', async () => {
        const getDiscoveryDocumentMock = jest.spyOn(auth, 'getDiscoveryDocument');
        getDiscoveryDocumentMock.mockReturnValue(expectedDiscoveryDocument);

        const expectedRequest = {
            codeVerifier: 'codeVerifier'
        };

        const expectedConfig = {
            clientId: '1111222233334444',
            redirectUri: undefined,
            responseType: 'code',
            scopes: ['openid', 'profile', 'email']
        };

        const promptAsyncMock = jest.fn();

        const useAuthRequestMock = mocked(useAuthRequest, true);
        useAuthRequestMock.mockReturnValue([
            // @ts-ignore
            expectedRequest,
            // @ts-ignore
            { status: 200 },
            promptAsyncMock
        ]);

        const doLoginAsyncActionMock = jest.spyOn(auth, 'doLoginAsyncAction');
        doLoginAsyncActionMock.mockReturnValue(new Promise<AuthenticatedUser>(() => expectedAuthenticatedUser));

        const [request, doLoginAsync] = await auth.getAuthToken();

        expect(getDiscoveryDocumentMock).toBeCalled();

        expect(useAuthRequestMock).toHaveBeenCalledWith(expectedConfig, expectedDiscoveryDocument);

        expect(request).toEqual(expectedRequest);
        expect(doLoginAsync).toEqual(expect.any(Function));
    });

    describe('getRefreshAction', () => {
        it('gets discovery document and returns a doRefreshTokenAction function', () => {
            const getDiscoveryDocumentMock = jest.spyOn(auth, 'getDiscoveryDocument');
            getDiscoveryDocumentMock.mockReturnValue(expectedDiscoveryDocument);

            const refreshTokenAction = auth.getRefreshAction();

            expect(getDiscoveryDocumentMock).toHaveBeenCalledTimes(1);
            expect(refreshTokenAction).toEqual(expect.any(Function));
        });
    });
});
