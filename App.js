import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';

import RootNavigator from './src/navigation/RootNavigator';

import { PersistGate } from 'redux-persist/integration/react';

/*
Quanto a API https://swapi.dev/api/ relacionar : 
  Peoples
*/

export default function App() {
  return (  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
    );
}
