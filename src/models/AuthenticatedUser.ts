export class AuthenticatedUser {
    accessToken: string;
    expiresIn?: number;
    refreshToken?: string;
    scope?: string;
    state?: string;
    idToken?: string;
    issuedAt: number;

    constructor({
        accessToken,
        expiresIn,
        refreshToken,
        scope,
        state,
        idToken,
        issuedAt
    }: {
        accessToken: string;
        expiresIn?: number;
        refreshToken?: string;
        scope?: string;
        state?: string;
        idToken?: string;
        issuedAt: number;
    }) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.refreshToken = refreshToken;
        this.scope = scope;
        this.state = state;
        this.idToken = idToken;
        this.issuedAt = issuedAt;
    }
}
