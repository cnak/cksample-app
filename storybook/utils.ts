/* istanbul ignore file */
import logger from '../src/utils/logger';

export const logFunctionParams = (...params: any): any => {
    logger.log('function called with params:', params);
};

export const logOnGoBack = () => {
    logger.log('went back');
};
