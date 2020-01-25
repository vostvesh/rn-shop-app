import React, { useState, useEffect } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import ShopNavigator from "./navigation/ShopNavigator";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from './store/reducers/orders';

const store = createStore(
  combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
  })
);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/openSansRegular.ttf'),
      'open-sans-bold': require('./assets/fonts/openSansBold.ttf')
    });
  };

  useEffect(() => {
    fetchFonts().then(_ => setFontLoaded(true)).catch(e => console.info(e))
    // if (!fontLoaded) {
      // <AppLoading
      //   startAsync={fetchFonts}
      //   onFinish={setFontLoaded(true)}
      //   onError={(e) => {console.warn(e)}}
      // />;
    // }
  }, [])

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
