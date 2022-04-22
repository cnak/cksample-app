export interface LinkProps {
    children: string;
    hideFromAccessibility?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    style?: object;
    onPress(): void;
}
