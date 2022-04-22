import { ReactNode } from 'react';

import { MinimumScreenProps } from '../types';
import { ErrorIslandProps } from '../../components/ErrorIsland/types';
import { NavigationProps } from '../../navigation/types';

export interface PageWrapperProps
    extends Pick<NavigationProps, 'canGoBack' | 'goBack' | 'navigation'>,
        MinimumScreenProps,
        ErrorIslandProps {
    children: ReactNode;
    onCTAPress?: (values: any) => void;
    replaceTitlePlaceholder?: (title: string) => string;
    afterButton?: ReactNode;
    withoutNavigator?: boolean;
}
