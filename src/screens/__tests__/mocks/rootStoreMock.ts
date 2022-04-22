import { AuthenticationStoreMock as Authentication } from './authenticationStoreMock';

export class RootStoreMock {
    language: string;
    openingApp: boolean;
    Authentication: Authentication;

    constructor() {
        this.language = 'en';
        this.openingApp = false;
        this.Authentication = new Authentication(this);
    }
}
