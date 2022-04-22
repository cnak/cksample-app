import React from 'react';
import renderer from 'react-test-renderer';

import canGoBackProps from '../mocks/props';
import Header from '..';

const cannotGoBackProps = { ...canGoBackProps, canGoBack: false };
const signedOutHeaderProps = { ...cannotGoBackProps, isSignedIn: false };

describe('<Header>', () => {
    describe('matches snapshots', () => {
        /* it('can go back', () => { */
        /*     const tree = renderer.create(<Header {...canGoBackProps} />).toJSON(); */
        /*     expect(tree).toMatchSnapshot(); */
        /* }); */

        it('cant go back', () => {
            const tree = renderer.create(<Header {...cannotGoBackProps} />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('sign-in screen scenario', () => {
            const tree = renderer.create(<Header {...signedOutHeaderProps} />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
