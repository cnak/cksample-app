import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled, { css } from 'styled-components/native';

import StyledText from '../StyledText';
import { BRAND_DARK, WHITE } from '../colors';

import { HeaderProps } from './types';

const isIOS = Platform.OS === 'ios';

const StatusBarSeparator = styled.View<{ height: number }>`
    height: ${({ height }) => height}px;
`;

const VERTICAL_PADDING = 15;
const HORIZONTAL_PADDING = 15;
const ICON_SIZE = 30;

const Header = styled.View<{ canGoBack?: boolean }>`
    background-color: ${BRAND_DARK};
    height: ${ICON_SIZE + 2 * VERTICAL_PADDING}px;
    padding: ${VERTICAL_PADDING}px 0;
    flex-direction: row;
    justify-content: ${({ canGoBack }) => (canGoBack ? 'flex-start' : 'center')};
    align-items: center;
`;

const buttonPaddingCss = css`
    padding: ${isIOS ? 0 : VERTICAL_PADDING}px ${HORIZONTAL_PADDING}px;
`;

const BackButton = styled.TouchableOpacity`
    ${buttonPaddingCss};
`;

const HeaderText = styled(StyledText)`
    color: ${WHITE};
    font-size: 26px;
    font-weight: 300;
    padding: ${0}px 0;
    margin-left: ${-HORIZONTAL_PADDING}px;
`;

const HeaderWithStatusBar = ({ canGoBack, goBack, headerText }: HeaderProps) => {
    const onBackButtonPress = canGoBack && goBack ? () => goBack() : () => {};
    return (
        <>
            {isIOS && <StatusBar barStyle="default" />}

            <StatusBarSeparator height={getStatusBarHeight()} />

            <Header canGoBack={canGoBack}>
                {canGoBack && (
                    <BackButton
                        onPress={onBackButtonPress}
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                        testID="BackButton"
                    >
                        <MaterialIcons color={WHITE} name="arrow-back" size={ICON_SIZE} />
                    </BackButton>
                )}

                <HeaderText style={{ marginLeft: canGoBack ? 32 : 0 }} accessibilityLabel="Header">
                    {headerText}
                </HeaderText>
            </Header>
        </>
    );
};

export default HeaderWithStatusBar;
