import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button
} from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(product => product.id === productId)
  );

  return (
    <View style={styles.screen}>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;
