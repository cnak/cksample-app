import React from 'react';
import renderer from 'react-test-renderer';

import ErrorIsland from '..';

describe('<ErrorIsland>', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('matches snapshot', () => {
        const errors = [{ field: 'test', message: 'Test error message' }];
        const tree = renderer.create(<ErrorIsland errors={errors}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
