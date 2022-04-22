import React from 'react';
import { NavigationParams } from 'react-navigation';

import { useStoreContext } from '../../store/storeContext';

import EnableBiometrics from './EnableBiometrics';

export function EnableBiometricsScreen(props: any) {
    const store: any = useStoreContext();
    const {skipEnablingBiometrics, onEnableBiometrics} = store.Biometrics;
    const {createNewAccount} = store.AccountStore;
    const { language } = store;
    const navigation: NavigationParams = props.navigation;

    return <EnableBiometrics language={language} navigation={navigation}  notNow={skipEnablingBiometrics} onEnable={onEnableBiometrics} createNewAccount={createNewAccount}/>;
}
