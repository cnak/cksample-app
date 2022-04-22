import { mount } from 'enzyme';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';

import { BR, BulletPoint, H1, H2, H3, H4, Label, Link, P } from '..';

const onPressSpy = jest.fn();
const mountedLink = mount(<Link onPress={onPressSpy}>Add Something</Link>);

describe('Typography:', () => {
    describe('<H1>', () => {
        it('matches snapshot', () => {
            const tree = renderer.create(<H1>This is a test</H1>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('<H2>', () => {
        it('matches snapshot', () => {
            const tree = renderer.create(<H2>This is a test</H2>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('<H3>', () => {
        it('matches snapshot', () => {
            const tree = renderer.create(<H3>This is a test</H3>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('<H4>', () => {
        it('matches snapshot', () => {
            const tree = renderer.create(<H4>This is a test</H4>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('<P>', () => {
        it('matches snapshot', () => {
            const tree = renderer.create(<P>This is a test</P>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('<BR>', () => {
        it('matches snapshot', () => {
            const tree = renderer.create(<BR />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('<Link>', () => {
        describe('component composition', () => {
            it('includes TouchableOpacity', () => {
                expect(mountedLink.find(TouchableOpacity).length).toEqual(1);
            });
        });

        describe('component methods', () => {
            it('passes onPress function to Touchable', () => {
                expect(onPressSpy).not.toHaveBeenCalled();
                // @ts-ignore
                mountedLink
                    .find(TouchableOpacity)
                    .props()
                    .onPress({} as any);
                expect(onPressSpy).toHaveBeenCalledTimes(1);
            });
        });

        it('matches snapshot', () => {
            const tree = renderer.create(<Link onPress={onPressSpy}>Add Something</Link>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('<Label>', () => {
        it('matches snapshot', () => {
            const tree = renderer.create(<Label>This is a test</Label>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('<BulletPoint>', () => {
        it('matches snapshot', () => {
            const tree = renderer.create(<BulletPoint>This is a test</BulletPoint>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
