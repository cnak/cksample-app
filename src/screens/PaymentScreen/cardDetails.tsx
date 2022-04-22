// @ts-ignore
import axios from 'axios';
import querystring from 'querystring';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
// @ts-ignore
import { CreditCardInput } from 'react-native-credit-card-input';

import PageWrapper from '../../pageTypes/PageWrapper';
import { PAYMENT_CARD_DETAILS, PAYMENT_FAILURE, PAYMENT_SUCCESS } from '../../navigation/pageNames';

export default function CardDetails(props: any) {

    const [details, setDetails ] = useState();
    const { navigation } = props;

    useEffect(() => {
        // @ts-ignore
        setDetails({});
    }, {});

    const onChange = (formData: any) => {
        // tslint:disable-next-line:no-unused-expression no-console
        console.log(JSON.stringify(formData, null, ' '));
        setDetails(formData.values);
    };
    // tslint:disable-next-line:no-console
    const submitPaymentDetails = () => {
        const url = 'https://api.stripe.com/v1/tokens';
        // @ts-ignore
        // tslint:disable-next-line:variable-name
        const { name, number, expiry, cvc } = details;
        try {

        const requestBody = {
            'card[name]': name,
            'card[number]': number,
            'card[exp_month]': expiry.substring(0, 2),
            'card[exp_year]': expiry.substring(3, expiry.length),
            'card[cvc]': cvc
        };

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer pk_test_51GuwmhBqBCa0EUwLXTpTFZKa1sKkvcobmNSxXpf9kkeFf25N8fTPsQz8O5P3zynqzhXYrs4uba7V3q5xoymvpveG00epjGW9HC'
            }
        };
        axios.post(url, querystring.stringify(requestBody), config)
            .then((result) => {
                navigation.navigate(PAYMENT_SUCCESS, { result});
            })
            .catch((err) => {
                // tslint:disable-next-line:no-console
                navigation.navigate(PAYMENT_FAILURE, { err});
            });
        } catch {
            // tslint:disable-next-line:no-console
            console.log('ERROR: Payment screen');
        }
    };

    return (
        <PageWrapper language={'en'} navigation={navigation} pageName={PAYMENT_CARD_DETAILS} onCTAPress={() => {
            submitPaymentDetails();
        }}>
            <CreditCardInput
                autoFocus={true}
                requiresName={true}
                requiresCVC={true}
                requiresPostalCode={true}

                labelStyle={s.label}
                inputStyle={s.input}
                validColor={'black'}
                invalidColor={'red'}
                placeholderColor={'darkgray'}
                onChange={onChange}/>
                <View style={{marginTop: 20}} />

        </PageWrapper>
    );

}

const s = StyleSheet.create({
    switch: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    container: {
        backgroundColor: '#F5F5F5',
        marginTop: 60,
    },
    label: {
        color: 'black',
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: 'black',
    }
});
