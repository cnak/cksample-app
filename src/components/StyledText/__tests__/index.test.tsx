import React from 'react';
import renderer from 'react-test-renderer';

import StyledText from '..';

describe('<StyledText>', () => {
    it('matches snapshot', () => {
        const tree = renderer.create(<StyledText>This is a test</StyledText>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
