import { createMockFunction, createMockNavigation } from '../../../utils/testUtils';

export default {
    canGoBack: true,
    headerText: 'Header example',
    isSignedIn: true,
    promptUserSignOut: createMockFunction(),
    navigation: createMockNavigation()
};
