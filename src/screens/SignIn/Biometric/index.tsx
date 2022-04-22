import * as LocalAuthentication from 'expo-local-authentication';
import React, { Component} from 'react';
import {
    ImageBackground,
    StyleSheet
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { NavigationParams } from 'react-navigation';

import { AuthenticatedUser } from '../../../models/AuthenticatedUser';
import { ACCOUNT_SCREEN, SIGN_IN_SCREEN } from '../../../navigation/pageNames';

interface BiometricProps {
    navigation: NavigationParams;
    compatible: boolean;
    screenProps: any;
    refreshAction: (refreshToken: string | null) => Promise<AuthenticatedUser>;
    onAppOpen: (
        refreshAction: (refreshToken: string | null) => Promise<AuthenticatedUser>,
        navigation: NavigationParams
    ) => Promise<void>;
}

class Biometric extends Component<BiometricProps> {

    private _isMounted: boolean = false;
    private dropdown: any = React.createRef();
    private onAppOpen: any; // TODO: Proper types

    constructor(props: any) {
        super(props);
        this.state = {
            compatible: false
        };
    }

    componentDidMount() {
        this.checkDeviceForHardware();
        this.onAppOpen = this.props.onAppOpen;
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.dropdown = null;
    }

    checkDeviceForHardware = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        this.setState({ compatible });
        if (!compatible) {
            this.showIncompatibleAlert();
        } else {
            this.checkForBiometrics();
        }
    };

    showIncompatibleAlert = () => {
        this.dropdown.alertWithType(
            'error',
            'Incompatible Device',
            'Current device does not have the necessary hardware to use this API.'
        );
    };

    checkForBiometrics = async () => {
        const biometricRecords = await LocalAuthentication.isEnrolledAsync();

        if (!biometricRecords) {
            this.dropdown.alertWithType(
                'warn',
                'No Biometrics Found',
                'Please ensure you have set up biometrics in your OS settings.'
            );
        } else {
            this.handleLoginPress();
        }
    };

    handleLoginPress = () => {
        // TODO handle Android alert
        this.scanBiometrics();
    };

    scanBiometrics = async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Biometric Scan.',
            fallbackLabel: 'Use Passcode',
            cancelLabel: 'Cancel'
        });

        const { navigation, screenProps } = this.props;

        if (result.success) {
            const alertType = {
                type: 'success',
                title: 'You are you!',
                message: 'Bio-Authentication succeeded.'
            };

            // If successful biometric verification, we want to attempt to refresh our tokens.
            this.onAppOpen(this.props.refreshAction, navigation);

            navigation.navigate(ACCOUNT_SCREEN, { alertType });
            screenProps.store.AccountStore.setShouldDisplaySuccessfullyAuthenticated(true);

        } else {
            this.dropdown.alertWithType(
                'error',
                'Uh oh!',
                'Bio-Authentication failed or canceled.'
            );

            navigation.navigate(SIGN_IN_SCREEN, { reason: 'Biometric authentication cancelled' });
        }
    };

    render() {
        // TODO: This should fix a memory leak of this component trying to update a component when its unmounted but for some reason it doesnt. Need to look into this.
        // TODO: ^ For the moment this is not causing any problems or performance problems and is only called when biometric auth is cancelled and user has to sign in manually.
        if (this._isMounted) {
            return (
                <ImageBackground style={styles.container} source={require('../../../../assets/logo.png')}
                                 resizeMode={'center'}>
                    <DropdownAlert
                        ref={ref => (this.dropdown = ref)}
                        closeInterval={5000}
                    />
                </ImageBackground>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 10,
        backgroundColor: 'white',
        resizeMode: 'center' // or 'stretch'

    }
});

export default Biometric;
