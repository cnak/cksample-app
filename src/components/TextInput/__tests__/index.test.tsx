import React from 'react';
import renderer from 'react-test-renderer';

import TextInput from '../.';

describe('<TextInput>', () => {
    it('matches snapshot', () => {
        const tree = renderer.create(<TextInput>This is a test</TextInput>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
