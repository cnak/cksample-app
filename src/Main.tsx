import React from 'react';

import AppNavigator from './navigation/AppNavigator';
import { RootStore } from './store/rootStore';
import StoreContext from './store/storeContext';

const rootStore: any = new RootStore();

export default function Main() {
    return (
        <StoreContext.Provider value={rootStore}>
            <AppNavigator screenProps={{ store: rootStore }}/>
        </StoreContext.Provider>
    );
}
