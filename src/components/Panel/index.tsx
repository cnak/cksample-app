import styled, { css } from 'styled-components/native';

import { H1, H3 } from '../Typography';
import { RED, TURQUOISE, WHITE } from '../colors';

export const Panel = styled.View<{ warning?: boolean }>`
    background-color: ${(props) => (props.warning ? RED : TURQUOISE)};
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    padding: 10px;
    border: 5px solid transparent; /* not sure why needed, but it's in GDS pattern */
`;

const panelTextCSS = css`
    color: ${WHITE};
    text-align: center;
`;

export const PanelTitle = styled(H1)`
    ${panelTextCSS}
`;

export const PanelSubTitle = styled(H3)`
    ${panelTextCSS}
`;
