import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { action, computed, observable } from 'mobx';

interface AccountDetailsProps {
    accountId: string;
    balance: number;
}

export interface Transaction {
    txId: string;
    date: Date;
    amount: number;
    source: string;
    processed: boolean;
}

export interface Account {
    id: string;
    username: string;
    balance: number;
    transactions: Array<Transaction>;
}

const API_ENDPOINT = '';
const CODE = '';

class AccountStore {
    rootStore: any;
    @observable account: Account = {
        id: '',
        username: '',
        balance: 0,
        transactions: []
    };
    @observable accountId: string = '';
    @observable displaySuccessfullyAuthenticated: boolean = false;

    constructor(rootStore: any) {
        this.rootStore = rootStore;
    }

    @computed get getAccountDetails(): AccountDetailsProps {
        return JSON.parse(JSON.stringify(this.accountId));
    }

    @computed get vrnRecordExist() {
        return this.accountId.length > 0;
    }

    @computed get shouldDisplaySuccessfullyAuthenticated(): boolean {
        return this.displaySuccessfullyAuthenticated;
    }

    @action setShouldDisplaySuccessfullyAuthenticated(shouldDisplay: boolean) {
        this.displaySuccessfullyAuthenticated = shouldDisplay;
    }

    @action createNewAccount = async () => {
        const subject = await SecureStore.getItemAsync('subject');

        console.log('createNewAccount: subject => ', subject);

        if (subject) {
            try {
                const apiUrl = API_ENDPOINT + '/account' + CODE;

                const response = await axios.request({
                    method: 'POST',
                    url: apiUrl,
                    data: {
                        username: subject
                    }
                });

                if (response.status !== 200) {
                    // Do something here as failed to insert new account?
                    // tslint:disable-next-line:no-console
                    console.warn(response);
                }
            } catch (error) {
                // tslint:disable-next-line:no-console
                console.warn(error);
            }
        }
    }

    @action retrieveAccountData = async () => {
        const subject = await SecureStore.getItemAsync('subject');

        if (subject) {
            try {
                const retrievedAccount = await axios.get(API_ENDPOINT + '/account/' + subject + CODE);
                this.account = retrievedAccount.data;
            } catch (error) {
                // tslint:disable-next-line:no-console
                console.error(error);
            }
        }
    };

    @action addTransaction = async (amount: number, source: string, processed: boolean = false) => {
        const subject = await SecureStore.getItemAsync('subject');

        if (subject) {
            try {
                const apiUrl = API_ENDPOINT + '/transaction' + CODE;

                const response = await axios.request({
                    method: 'POST',
                    url: apiUrl,
                    data: {
                        username: subject,
                        amount,
                        source,
                        processed
                    }
                });

                if (response.status !== 200) {
                    // Do something here as failed to insert new account?
                    // tslint:disable-next-line:no-console
                    console.error(response);
                }
            } catch (error) {
                // tslint:disable-next-line:no-console
                console.error(error);
            }
        }
    }
}

export default AccountStore;
