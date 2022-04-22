export class AuthenticationStoreMock {
    rootStoreMock: any;

    onLogin = {};
    onAppOpen = jest.fn();

    constructor(rootStoreMock: any) {
        this.rootStoreMock = rootStoreMock;
    }
}
