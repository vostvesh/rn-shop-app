import React, { useState, useEffect } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ShopNavigator from "./navigation/ShopNavigator";

const store = createStore(
  combineReducers({
    products: productsReducer,
    cart: cartReducer
  })
);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => {
        setFontLoaded(true);
      }}
      onError={(e) => {console.warn(e)}}
    />;
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
