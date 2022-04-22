import React from 'react';
import renderer from 'react-test-renderer';

import Caption from '..';

describe('<Caption>', () => {
    describe('matches snapshots', () => {
        it('size "xl"', () => {
            const tree = renderer.create(<Caption size="xl">Label me</Caption>).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('size "l"', () => {
            const tree = renderer.create(<Caption size="l">Label me</Caption>).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('size "m"', () => {
            const tree = renderer.create(<Caption size="m">Label me</Caption>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
