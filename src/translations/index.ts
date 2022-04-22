import {
    ACCOUNT_SCREEN,
    ENABLE_BIOMETRICS_SCREEN, PAYMENT_CARD_DETAILS,
    PAYMENT_FAILURE,
    PAYMENT_SCREEN,
    PAYMENT_SUCCESS,
    SIGN_IN_SCREEN
} from '../navigation/pageNames';

import { ENGLISH } from './languages';

export default {
    [ENGLISH]: {
        [SIGN_IN_SCREEN]: {
            headerText: 'SIGN IN',
            ctaText: 'Sign in',
            emailLabel: 'Email address',
            title: 'Sign in',
            passwordLabel: 'Password'
        },
        [ACCOUNT_SCREEN]: {
            headerText: 'Lowell',
            caption: ' ',
            title: 'What you need to do',
            ctaText: 'Go to payment'
        },
        [PAYMENT_SCREEN]: {
            headerText: 'Payment',
            caption: ' ',
            title: '',
            ctaText: 'Enter card details'
        },
        [ENABLE_BIOMETRICS_SCREEN]: {
            headerText: 'Enable Biometrics',
            caption: ' ',
            title: '',
            ctaText: 'Not Now',
        },
        [PAYMENT_FAILURE]: {
            headerText: 'Payment Failure',
            caption: ' ',
            title: '',
            ctaText: 'Attempt Payment Again'
        },
        [PAYMENT_SUCCESS]: {
            headerText: 'Payment Success',
            caption: ' ',
            title: '',
            ctaText: 'Go Back to Account'
        },
        [PAYMENT_CARD_DETAILS]: {
            headerText: 'Payment Card Details',
            caption: ' ',
            title: '',
            ctaText: 'Pay'
        }
    }
};
