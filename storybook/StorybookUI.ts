import { configure, getStorybookUI } from '@storybook/react-native';

configure(() => {
    // eslint-disable-next-line global-require
    require('./stories');
}, module);

export default getStorybookUI({});
