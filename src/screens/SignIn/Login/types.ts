import { AuthRequestPromptOptions } from 'expo-auth-session';
import { NavigationParams } from 'react-navigation';

import { AuthenticatedUser } from '../../../models/AuthenticatedUser';
import { BasicScreenStateProps } from '../../../pageTypes/types';
import { NavigationProps } from '../../../navigation/types';

export interface LoginAction {
    onLogin: (
        doLoginAsync: (options?: AuthRequestPromptOptions) => Promise<AuthenticatedUser>,
        navigation: NavigationParams | undefined
    ) => void;
}

export interface LoginProps extends BasicScreenStateProps, LoginAction, NavigationProps {}
