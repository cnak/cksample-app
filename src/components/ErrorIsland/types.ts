export interface ValidationError {
    field: string;
    message: string;
}

export interface ErrorWithPress extends ValidationError {
    onPress?: () => void;
}

export interface ErrorIslandProps {
    errors?: Array<ErrorWithPress>;
}
