/* istanbul ignore file */

/* tslint:disable:no-console */
const devLogging = {
    error: console.error,
    log: console.log,
    warn: console.warn
};
const prodLogging = {
    error: () => {},
    log: () => {},
    warn: () => {}
};

export default __DEV__ ? devLogging : prodLogging;
