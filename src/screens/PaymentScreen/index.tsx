import React, { useRef} from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

import { PAYMENT_FAILURE, PAYMENT_SUCCESS } from '../../navigation/pageNames';

// @ts-ignore
import { STRIPE } from './stripeSettings';

export default function PaymentScreen(props: any) {
    const { navigation } = props;

    const onSuccessHandler = () => {

        navigation.navigate(PAYMENT_SUCCESS);
    };
    const onCanceledHandler = () => { /* TODO: do something */
    };

    // Called everytime the URL stats to load in the webview
    const onLoadStart = (syntheticEvent: { nativeEvent: any; }) => {
        const { nativeEvent } = syntheticEvent;
        if (nativeEvent.url === STRIPE.SUCCESS_URL) {
            onSuccessHandler();
            return;
        }
        if (nativeEvent.url === STRIPE.CANCELED_URL) {
            onCanceledHandler();
        }
    };

    const webapp2 = require('./stripePayMe.html');
    const webviewStyles = StyleSheet.create({
        flexContainer: {
            flex: 1
        }
    });

    const webviewRef = useRef(null);

    const navigateToResultPage = (navState) => {
        if ((navState.url).includes('success.html')) {
            navigation.navigate(PAYMENT_SUCCESS);
        } else if ((navState.url).includes('cancelled.html')) {
            navigation.navigate(PAYMENT_FAILURE);
        }
    };

    return (

        <WebView
            originWhitelist={['*']}
            source={webapp2}
            javaScriptEnabled={true}
            onLoadStart={onLoadStart}
            ref={webviewRef}
            onNavigationStateChange={navState => {
                navigateToResultPage(navState);
            }}
            style={webviewStyles.flexContainer}
        />
    );
}
