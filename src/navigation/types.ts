import { NavigationParams } from 'react-navigation';

export interface NavigationProps {
    navigation: NavigationParams;
    canGoBack?: boolean;
    goBack?: () => void;
    push?: (path: string, params: any) => void;
    getParam?: (prop: string) => any;
}
