import * as SecureStore from 'expo-secure-store';
import { action, computed, observable } from 'mobx';
import { NavigationParams } from 'react-navigation';

import { ACCOUNT_SCREEN } from '../navigation/pageNames';

/*
    Flags in secure store:
        - isBiometricsEnabled: flag to check if biometrics is enabled or not
        - wasBiometricsPageShown: flag to check if biometrics page was shown and decision about biometrics was made
 */
class Biometrics {
    rootStore: any;
    @observable biometricsEnabled: boolean = false;

    constructor(rootStore: any) {
        this.rootStore = rootStore;
        this.checkIfBiometricsEnabled();
    }

    @computed get isBiometricsEnabled() {
        return this.biometricsEnabled;
    }

    async checkIfBiometricsEnabled() {
        this.biometricsEnabled = await SecureStore.getItemAsync('isBiometricsEnabled') === 'Yes';
    }

    @action skipEnablingBiometrics = async (navigation: NavigationParams): Promise<void> => {

        await SecureStore.setItemAsync('isBiometricsEnabled', 'No');
        await SecureStore.setItemAsync('wasBiometricsPageShown', 'Yes');

        navigation.navigate(ACCOUNT_SCREEN);
    };

    @action onEnableBiometrics = async (navigation: NavigationParams): Promise<void> => {

        await SecureStore.setItemAsync('isBiometricsEnabled', 'Yes');
        await SecureStore.setItemAsync('wasBiometricsPageShown', 'Yes');

        navigation.navigate(ACCOUNT_SCREEN); // TODO: Navigate back to the sign in screen and attempt to authenticate with biometrics
    };
}

export default Biometrics;
