import React from 'react';
import renderer from 'react-test-renderer';

import LabelledTextInput from '../.';
describe('<LabelledTextInput>', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('matches snapshot', () => {
        const tree = renderer.create(<LabelledTextInput label="Username" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
