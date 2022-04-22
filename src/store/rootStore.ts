import AccountStore from './account';
import Authentication from './authentication';
import Biometrics from './biometrics';

class RootStore {
    Authentication: Authentication;
    AccountStore: AccountStore;
    Biometrics: Biometrics;
    language: string;
    openingApp: boolean;

    constructor() {
        this.language = 'en';
        this.openingApp = false;
        this.Authentication = new Authentication(this);
        this.AccountStore = new AccountStore(this);
        this.Biometrics = new Biometrics(this);
    }
}

export { RootStore };
