import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { Col, Grid, Row } from 'react-native-easy-grid';

import PageWrapper from '../../pageTypes/PageWrapper';
import { BR, H1, H2, H2Small, P } from '../../components/Typography';
import AccountStore, { Transaction } from '../../store/account';
import { ACCOUNT_SCREEN, PAYMENT_SCREEN } from '../../navigation/pageNames';

export default function AccountScreen(props: any) {
    const { navigation, screenProps } = props;
    const store: AccountStore = screenProps.store.AccountStore;
    const {retrieveAccountData} = store;
    const alertType: any = navigation.getParam('alertType');
    let dropDownAlertRef: any = React.createRef();

    const [balance, setBalance] = useState(0);

    retrieveAccountData().then(() => {
        setBalance(store.account.balance);
    });

    const generateTransactionTable = (): JSX.Element => {

        const dates: Array<JSX.Element> = [];
        const payments: Array<JSX.Element> = [];

        if (store.account) {
            store.account.transactions.forEach((tx: Transaction, index: number) => {
                const date = new Date(tx.date);
                dates.push(<Row key={'date-' + index}><P>{('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()}</P></Row>);
                payments.push(<Row key={'payment-' + index}><P>£{tx.amount}</P></Row>);
            });
        }

            return (
                <ScrollView>
                   <Grid>
                       <Col>
                           <Row><H2Small>Date</H2Small></Row>
                           {dates}
                       </Col>
                       <Col>
                           <Row><H2Small>Payment</H2Small></Row>
                           {payments}
                       </Col>
                   </Grid>
                </ScrollView>
            );
    };

    useEffect(() => {
        if (store.displaySuccessfullyAuthenticated) {
            dropDownAlertRef.alertWithType(alertType.type, alertType.title, alertType.message);
            store.setShouldDisplaySuccessfullyAuthenticated(false);
        }
    }, []);

    return (
        <>
            <PageWrapper language={'en'} navigation={navigation} pageName={ACCOUNT_SCREEN} onCTAPress={() => {
                navigation.replace(PAYMENT_SCREEN);

            }}>
                <H1>Your account</H1>
                <H2>Balance £{balance}</H2>
                <BR />
                <H2>Transactions</H2>
                {generateTransactionTable()}
            </PageWrapper>
            <DropdownAlert ref={(ref) => (dropDownAlertRef = ref)}/>
        </>
    );
}
