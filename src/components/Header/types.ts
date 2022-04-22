import { NavigationProps } from '../../navigation/types';

export interface HeaderTextProps {
    headerText: string;
}
export interface HeaderProps extends HeaderTextProps, NavigationProps {}
