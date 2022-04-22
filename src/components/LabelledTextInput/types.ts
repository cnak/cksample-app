import { TextInputProps } from 'react-native';

import { ValidationError } from '../ErrorIsland/types';

export interface LabelledTextInputProps extends TextInputProps {
    label?: string;
    hint?: string;
    width?: string;
    id?: string;
    children?: any;
    showBorderOnError?: boolean;
    showLabel?: boolean;
    validationField?: string;
    errors?: Array<ValidationError>;
}
