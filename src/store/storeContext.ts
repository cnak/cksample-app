import React, { useContext } from 'react';

export const useStoreContext = () => useContext(StoreContext);

const StoreContext = React.createContext('');

export default StoreContext;
