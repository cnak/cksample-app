import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

import { TEXT_COLOUR } from '../colors';

export default styled.Text`
    color: ${TEXT_COLOUR};
    font-family: Helvetica;
    ${Platform.select({
        ios: css`
            font-family: "Helvetica";
        `,
        android: css`
            font-family: Roboto;
        `
    })};
    font-size: 16px;
`;
