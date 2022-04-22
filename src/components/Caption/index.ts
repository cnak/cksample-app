import styled from 'styled-components/native';

import StyledText from '../StyledText';
import { SECONDARY_TEXT_COLOUR } from '../colors';

import { CaptionProps } from './types';

const fontSizes = {
    xl: 18,
    l: 16,
    m: 16
};

const marginBottom = {
    xl: 5,
    l: 5,
    m: 0
};

const Caption = styled(StyledText)`
    color: ${SECONDARY_TEXT_COLOUR};
    font-size: ${({ size }: CaptionProps) => fontSizes[size]}px;
    margin-bottom: ${({ size }: CaptionProps) => marginBottom[size]}px;
`;

export default Caption;
