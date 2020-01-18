import React from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../constants/colors";

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotalAmount}</Text>
        </Text>
        <Button
          color={colors.accent}
          title="Order Now"
          disabled={cartItems.length <= 0}
        />
      </View>
      <View>
        <Text>CART ITEMS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5
  },
  summaryText: {
    // fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: colors.accent
  }
});

export default CartScreen;
