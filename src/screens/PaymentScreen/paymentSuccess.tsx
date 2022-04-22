import React, { useState } from 'react';
import { H1 } from '../../components/Typography';

import PageWrapper from '../../pageTypes/PageWrapper';
import { ACCOUNT_SCREEN, PAYMENT_SUCCESS } from '../../navigation/pageNames';

export default function PaymentSuccess(props: any) {
    const [details, setDetails] = useState();

    const { navigation } = props;

    return (
        <PageWrapper language={'en'} navigation={navigation} pageName={PAYMENT_SUCCESS} onCTAPress={() => {
            navigation.navigate(ACCOUNT_SCREEN);
        }}>
            <H1>SUCCESS</H1>
        </PageWrapper>
    );

}
