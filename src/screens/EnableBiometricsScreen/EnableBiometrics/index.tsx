import React from 'react';
import styled from 'styled-components/native';

import CTAButton from '../../../components/CTAButton';
import PageWrapper from '../../../pageTypes/PageWrapper';
import { BR } from '../../../components/Typography';
import { ENABLE_BIOMETRICS_SCREEN} from '../../../navigation/pageNames';

import { LoginProps } from './types';

const HomeH1 = styled.Text`
    margin: 0 auto;
    color: #434a4e;
    font-weight: bold;
    font-size: 33px;
`;

const P = styled.Text`
    font-size: 20px;
    font-weight: 300
    line-height: 28px;
    margin-top: 15px;
    margin-bottom: 15px;
`;

const EnableBiometrics = ({ language, navigation, onEnable, notNow, createNewAccount }: LoginProps) => {

    createNewAccount();

    return (
        <PageWrapper
            withoutNavigator={true}
            canGoBack={false}
            language={language}
            navigation={navigation}
            pageName={ENABLE_BIOMETRICS_SCREEN}
            onCTAPress={() => notNow(navigation)}
        >
            <HomeH1>Enable Touch ID?</HomeH1>
            <P>Would you like to enable Touch ID to log in faster next time?</P>

            <BR />
            <BR />
            <BR />
            <CTAButton ctaText="Yes" onCTAPress={() => onEnable(navigation)} testID="yes-enable-biometrics" />
            <BR />
        </PageWrapper>
    );
};

export default EnableBiometrics;
