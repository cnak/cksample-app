import React from 'react';
import styled from 'styled-components/native';

import { H2, rem } from '../Typography';
import { ERROR_COLOUR } from '../colors';

import { ErrorIslandProps } from './types';

const StyledView = styled.View`
    border: 4px solid ${ERROR_COLOUR};
    padding: 15px;
    margin-bottom: 15px;
`;

export default ({ errors }: ErrorIslandProps) => {
    if (!errors || errors.length === 0) {
        return null;
    }

    return (
        <StyledView>
            <H2 style={{ fontSize: rem(1.125), marginBottom: 0 }} accessibilityLiveRegion="assertive">
                There is a problem
            </H2>
        </StyledView>
    );
};
