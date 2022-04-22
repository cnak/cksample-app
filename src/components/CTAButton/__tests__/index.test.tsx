import React from 'react';
import renderer from 'react-test-renderer';

import CTAButton from '..';

describe('<CTAButton>', () => {
    it('matches snapshot', () => {
        const tree = renderer
            .create(<CTAButton ctaText="Tap here" onCTAPress={jest.fn()} testID="CTAButton:Title of Page" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
