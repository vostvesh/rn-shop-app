import React from 'react';
import { View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import productsReducer from './store/reducers/products';

const store = createStore(combineReducers({
  products: productsReducer
}));

export default function App() {
  return (
    <Provider store={store}>
      <View>...</View>
    </Provider>
  );
}
