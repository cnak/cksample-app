import React, { useState } from 'react';
import { H1 } from '../../components/Typography';

import PageWrapper from '../../pageTypes/PageWrapper';
import { PAYMENT_CARD_DETAILS, PAYMENT_FAILURE} from '../../navigation/pageNames';

export default function PaymentFailure(props: any) {
    const [details, setDetails] = useState();

    const { navigation } = props;

    return (
        <PageWrapper language={'en'} navigation={navigation} pageName={PAYMENT_FAILURE} onCTAPress={() => {
            navigation.replace(PAYMENT_CARD_DETAILS);
        }}>
            <>
                <H1>OOPS I did it again!!</H1>
            </>
        </PageWrapper>
    );

}
