import React from 'react';
import styled from 'styled-components/native';

import StyledText from '../StyledText';
import { BUTTON_COLOUR, WHITE } from '../colors';

import { CTAButtonProps } from './types';

const Button = styled.TouchableOpacity`
    background-color: ${BUTTON_COLOUR};
    line-height: 1.25px;
    margin: 0 auto;
    padding: 8px 0;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    width: 50%;
`;

const CTAText = styled(StyledText)`
    color: ${WHITE};
`;

// TODO (nice-to-have?) yellow-border on long-press / on-focus?
// TODO accessibility traits
const CTAButton = ({ ctaText, onCTAPress, style, testID }: CTAButtonProps) => (
    <Button
        accessibilityRole="button"
        accessibilityLabel={ctaText}
        testID={testID}
        onPress={onCTAPress}
        activeOpacity={0.5}
        style={style}
    >
        <CTAText>{ctaText}</CTAText>
    </Button>
);

export default CTAButton;
