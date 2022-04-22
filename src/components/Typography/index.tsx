import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import StyledText from '../StyledText';
import { BORDER_COLOUR, GREY_1, LINK_COLOUR, RED } from '../colors';

import { LinkProps } from './types';

export const rem = (size: number) => {
    // on ios rem is a multiple of 14px
    return 16 * size;
};

export const H1 = styled(StyledText)`
    font-weight: bold;
    font-size: ${rem(2)}px;
    line-height: ${rem(1.09375 * 2)}px;
    margin-bottom: 20px;
`;

export const H2 = styled(StyledText)`
    font-weight: bold;
    font-size: ${rem(1.5)}px;
    line-height: ${rem(1.04167 * 1.5)}px;
    margin-bottom: 15px;
`;

export const H2Small = styled(H2)`
    font-size: ${rem(1)}px;
`;

export const H3 = styled(StyledText)`
    font-weight: bold;
    font-size: ${rem(1.125)}px;
    line-height: ${rem(1.125 * 1.5)}px;
    margin-bottom: 15px;
`;

export const H4 = styled(StyledText)`
    font-size: ${rem(1)}px;
    line-height: ${rem(1.25 * 1.5)}px;
    margin-bottom: 15px;
`;

export const P = styled(StyledText)`
    font-size: ${rem(1)}px;
    line-height: ${rem(1.25 * 1)}px;
    margin-bottom: 15px;
`;

const Row = styled.View`
    flex-direction: row;
`;

export const BulletPoint = (props: any) => (
    <Row>
        <P>{'\u2022'}</P>
        <P style={{ flex: 1, paddingLeft: 10 }}>{props.children}</P>
    </Row>
);

export const BR = styled.View`
    padding: 15px 0;
    height: ${rem(1)}px;
`;

export const DetailsTextView = styled.View`
    padding: 15px 15px 15px 20px;
    border-left-width: 5px;
    border-style: solid;
    border-left-color: ${BORDER_COLOUR};
`;

const LinkText = styled(StyledText)`
    color: ${LINK_COLOUR};
    font-size: ${rem(1)}px;
    line-height: ${rem(1.25 * 1.5)}px;
    text-decoration: underline;
    margin-bottom: 5px;
`;

export const Link = ({
    accessibilityHint,
    accessibilityLabel,
    children,
    hideFromAccessibility,
    onPress,
    style
}: LinkProps) => {
    const accessibilityProps = hideFromAccessibility
        ? { accessible: false, accessibilityElementsHidden: true }
        : {
              accessible: true,
              accessibilityLabel: accessibilityLabel || `${children}.`,
              accessibilityHint: accessibilityHint || ''
          };
    return (
        <TouchableOpacity onPress={onPress} {...accessibilityProps} accessibilityRole="link">
            <LinkText style={style}>{children}</LinkText>
        </TouchableOpacity>
    );
};

export const Label = styled(StyledText)`
    font-size: ${rem(1)}px;
    line-height: ${rem(1.25 * 1)}px;
    margin-bottom: 10px;
`;

export const ErrorLabel = styled(Label)`
    color: ${RED};
    font-weight: bold;
`;

export const Hint = styled(StyledText)`
    color: ${GREY_1};
    font-size: ${rem(1)}px;
    line-height: ${rem(1.25 * 1)}px;
    margin-bottom: 10px;
`;
