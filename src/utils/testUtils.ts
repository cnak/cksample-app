/* istanbul ignore file */

import { Platform } from 'react-native';

import { logFunctionParams } from '../../storybook/utils';

export const IS_TEST_ENV = process.env.NODE_ENV === 'test';

export const setPlatformToIOS = () => {
    Platform.OS = 'ios';
};
export const setPlatformToAndroid = () => {
    Platform.OS = 'android';
};

export const createMockFunction = () => {
    if (IS_TEST_ENV) {
        return jest.fn();
    }
    // can be used for storybook
    return logFunctionParams;
};

export const createMockNavigation = () => ({
    pop: createMockFunction(),
    navigate: createMockFunction()
});
