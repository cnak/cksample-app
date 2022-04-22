import React from 'react';
import renderer from 'react-test-renderer';

import { Panel, PanelSubTitle, PanelTitle } from '../.';

describe('<Panel>', () => {
    it('matches snapshot', () => {
        const tree = renderer.create(<Panel />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('<PanelTitle>', () => {
        it('matches snapshot', () => {
            const tree = renderer.create(<PanelTitle>This is a test</PanelTitle>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('<PanelSubTitle>', () => {
        it('matches snapshot', () => {
            const tree = renderer.create(<PanelSubTitle>This is a test</PanelSubTitle>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
