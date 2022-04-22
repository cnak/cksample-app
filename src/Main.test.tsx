import { shallow } from 'enzyme';
import React from 'react';

import Main from './Main';

/**
 * @jest-environment jsdom
 */

describe('Entry point', () => {
    it('does not crash', () => {
        shallow(<Main />, { disableLifecycleMethods: true });
    });
});
