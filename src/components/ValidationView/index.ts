import styled from 'styled-components/native';

import { BLACK, RED } from '../colors';

export const VALIDATION_VIEW_MARGIN_BOTTOM = 25;

export const ERROR_PADDING_LEFT = 10;
export const ERROR_BORDER = 4;

const ValidationView = styled.View<{ hasError?: boolean; showBorderOnError?: boolean }>`
    border-left-width: ${props => (props.hasError && props.showBorderOnError ? ERROR_BORDER : 0)}px;
    border-left-color: ${props => (props.hasError && props.showBorderOnError ? RED : BLACK)};
    padding-left: ${props => (props.hasError && props.showBorderOnError ? ERROR_PADDING_LEFT : 0)}px;
    margin-bottom: ${VALIDATION_VIEW_MARGIN_BOTTOM}px;
`;

ValidationView.defaultProps = {
    showBorderOnError: true
};

export default ValidationView;
