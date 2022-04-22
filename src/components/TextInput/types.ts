import ReactNative from 'react-native';

export interface TextInputProps extends ReactNative.TextInputProps {
    width?: string;
}

export interface TextInputInternalState {
    showFocus: boolean;
}
