import React from 'react';

import ErrorIsland from '../ErrorIsland';
import logger from '../../utils/logger';
import { IS_TEST_ENV } from '../../utils/testUtils';

export default class ErrorBoundary extends React.Component {
    // @ts-ignore
    static getDerivedStateFromError(error, info) {
        return { errorMessage: error };
    }

    state = {
        errorMessage: ''
    };

    componentDidCatch(error: any) {
        if (IS_TEST_ENV) {
            logger.error(error);
        }
    }

    render() {
        const { errorMessage } = this.state;
        if (errorMessage) {
            const errors = [{ field: 'Error boundary', message: errorMessage }];
            return <ErrorIsland errors={errors} />;
        }

        return this.props.children;
    }
}
