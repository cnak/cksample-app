import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AccountScreen from '../../screens/Account/';
import Biometric from '../../screens/SignIn/Biometric';
import { EnableBiometricsScreen } from '../../screens/EnableBiometricsScreen';
import PaymentScreen from '../../screens/PaymentScreen';
import { SignInScreen } from '../../screens/SignIn';
import CardDetails from '../../screens/PaymentScreen/cardDetails';
// tslint:disable-next-line:no-duplicate-imports
import {
    ACCOUNT_SCREEN,
    ENABLE_BIOMETRICS_SCREEN,
    PAYMENT_CARD_DETAILS,
    PAYMENT_FAILURE,
    PAYMENT_SCREEN,
    PAYMENT_SUCCESS,
    SIGN_IN_SCREEN
} from '../pageNames';
import PaymentFailure from '../../screens/PaymentScreen/paymentFailure';
import PaymentSuccess from '../../screens/PaymentScreen/paymentSuccess';

const BIOMETRIC = 'BIOMETRIC';
const AppNavigator = createStackNavigator(
    {
        [SIGN_IN_SCREEN]: { screen: SignInScreen },
        [ACCOUNT_SCREEN]: { screen: AccountScreen },
        [BIOMETRIC]: { screen: Biometric },
        [PAYMENT_SCREEN]: { screen: PaymentScreen },
        [ENABLE_BIOMETRICS_SCREEN]: { screen: EnableBiometricsScreen },
        [PAYMENT_SUCCESS]: { screen: PaymentSuccess },
        [PAYMENT_FAILURE]: { screen: PaymentFailure },
        [PAYMENT_CARD_DETAILS]: { screen: CardDetails }
    },
    { initialRouteName: ACCOUNT_SCREEN, headerMode: 'none' }
);

export default createAppContainer(AppNavigator);
