import React, { Component } from 'react';
import styled from 'styled-components/native';

import { rem } from '../Typography';
import { YELLOW } from '../colors';

import { TextInputInternalState, TextInputProps } from './types';

const StyledInput = styled.TextInput`
    border: 2px solid black;
    font-size: ${rem(1)}px;
    height: 40px;
    padding: 5px;
    width: 100%;
    line-height: ${rem(1.25 * 1)}px;
`;

export const OUTLINE_WIDTH = 3;

const OutlineView = styled.View<{ showFocus: boolean; width: string }>`
    border-width: ${OUTLINE_WIDTH}px;
    border-color: ${props => (props.showFocus ? YELLOW : 'transparent')};
    width: ${props => props.width};
`;

export default class TextInput extends Component<TextInputProps, TextInputInternalState> {
    constructor(props: any) {
        super(props);
        this.state = { showFocus: false };
    }

    public render() {
        const { showFocus } = this.state;
        const { width = '100%' } = this.props;
        return (
            <OutlineView showFocus={showFocus} width={width}>
                <StyledInput
                    testID="TextInput"
                    onFocus={this.onFocus(true)}
                    onBlur={this.onFocus(false)}
                    spellCheck={false}
                    autoCorrect={false}
                    {...this.props}
                />
            </OutlineView>
        );
    }

    private onFocus = (bool: boolean) => () => {
        this.setState({ showFocus: bool });
        return true;
    };
}
