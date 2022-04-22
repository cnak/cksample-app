import { NavigationParams } from 'react-navigation';

import { BasicScreenStateProps } from '../../../pageTypes/types';
import { NavigationProps } from '../../../navigation/types';

export interface EnableBiometricsProps {
    onEnable: (navigation: NavigationParams | undefined) => void;
    notNow: (navigation: NavigationParams | undefined) => void;
    createNewAccount: () => Promise<void>;
}

export interface LoginProps extends BasicScreenStateProps, EnableBiometricsProps, NavigationProps {}
