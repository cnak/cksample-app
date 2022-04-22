import React from 'react';
import styled from 'styled-components/native';

import PageWrapper from '../../../pageTypes/PageWrapper';
import { auth } from '../../../api';
import { SIGN_IN_SCREEN } from '../../../navigation/pageNames';

import { LoginProps } from './types';

const HomeH1 = styled.Text`
    margin: 0 auto;
    color: #434a4e;
    font-weight: bold;
    font-size: 33px;
`;

const HomeH2Intro = styled.Text`
    margin: 0 auto;
    color: #fe5000;
    font-weight: 400;
    font-size: 53px;
`;

const P = styled.Text`
    font-size: 20px;
    font-weight: 300
    line-height: 28px;
    margin-top: 15px;
    margin-bottom: 15px;
`;

const Login = ({ language, onLogin, navigation }: LoginProps) => {
    const [, doLoginAsync] = auth.getAuthToken();

    return (
        <PageWrapper
            withoutNavigator={true}
            canGoBack={false}
            language={language}
            navigation={navigation}
            pageName={SIGN_IN_SCREEN}
            onCTAPress={() => onLogin(doLoginAsync, navigation)}
        >
            < HomeH1>Here to</HomeH1>
            <HomeH2Intro>support</HomeH2Intro>
            <HomeH1>you at every step</HomeH1>
            <P>At CKSampleApp, we believe it should be simple and affordable for you to become debt free. Now you’re with us,
                we’re here to support you while you take back control of your debt.</P>
        </PageWrapper>
    );
};

export default Login;
