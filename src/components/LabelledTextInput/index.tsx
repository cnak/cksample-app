import React from 'react';

import TextInput from '../TextInput';
import { ErrorLabel, Label } from '../Typography';
import ValidationView from '../ValidationView';
import { BLACK, RED } from '../colors';

import { LabelledTextInputProps } from './types';

const DEFAULT_WIDTH = '100%';

export const LabelledTextInput = (props: LabelledTextInputProps) => {
    const { label, errors, showBorderOnError, showLabel, validationField, width } = props;

    const error = errors && errors.length > 0 ? errors.find((e) => e.field === validationField) : undefined;
    const borderColor = error ? RED : BLACK;
    const errorMessage = error && error.message;
    return (
        <ValidationView hasError={!!error} showBorderOnError={showBorderOnError}>
            {label && showLabel && <Label accessibilityLabel={`Label for input. ${label}`}>{label}</Label>}
            {!!errorMessage && <ErrorLabel accessibilityLabel={`Error. ${errorMessage}`}>{errorMessage}</ErrorLabel>}
            <TextInput
                accessibilityLabel={`Input. ${label}`}
                width={width || DEFAULT_WIDTH}
                style={{ borderColor }}
                autoCompleteType="off"
                {...props}
            />
        </ValidationView>
    );
};

LabelledTextInput.defaultProps = {
    showLabel: true
};

export default LabelledTextInput;
