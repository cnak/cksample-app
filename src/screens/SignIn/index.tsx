import React from 'react';
import { NavigationParams } from 'react-navigation';

import { auth } from '../../api';
import { useStoreContext } from '../../store/storeContext';

import Biometric from './Biometric';
import Login from './Login';

export function SignInScreen(props: any) {
    const store: any = useStoreContext();
    const isBiometricsEnabled = store.Biometrics.isBiometricsEnabled;
    const onLogin = store.Authentication.onLogin;
    const onAppOpen = store.Authentication.onAppOpen;
    const { language } = store;

    const navigation: NavigationParams = props.navigation;
    const refreshAction = auth.getRefreshAction();

    const { params } = navigation.state;
    const biometricError = params ? params.reason : false;

    if (isBiometricsEnabled && !biometricError) {
        // Why is compatible a thing here???? Should it not check for compatibility inside?
        return <Biometric navigation={navigation} compatible={true} screenProps={props} refreshAction={refreshAction} onAppOpen={onAppOpen} />;
    } else {
        return <Login language={language} onLogin={onLogin} navigation={navigation} />;
    }
}
