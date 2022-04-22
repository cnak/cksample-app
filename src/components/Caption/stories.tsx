import { storiesOf } from '@storybook/react-native';
import React from 'react';

import Caption from '.';

storiesOf('Components', module)
    .add('Caption-XL', () => <Caption size="xl">Creating a new record</Caption>)
    .add('Caption-L', () => <Caption size="l">Creating a new record</Caption>)
    .add('Caption-M', () => <Caption size="m">Creating a new record</Caption>);
