/* tslint:disable:no-console */
import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
// import React from 'react';
import 'react-native';

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */

configure({ adapter: new EnzymeAdapter() });

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://localhost' });
const { window } = jsdom;

function copyProps(src: any, target: any) {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target)
    });
}

// @ts-ignore
global.window = window;
// @ts-ignore
global.document = window.document;
// @ts-ignore
global.navigator = {
    userAgent: 'node.js'
};
copyProps(window, global);

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error;
console.error = (message: string) => {
    if (message.startsWith('Warning:')) {
        return;
    }
    originalConsoleError(message);
};