import React from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import colors from '../../constants/colors';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';

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
    return transformedCartItems.sort((a, b) => {
      return a.productId > b.productId ? 1 : -1;
    });
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button
          color={colors.accent}
          title="Order Now"
          disabled={cartItems.length <= 0}
          onPress={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() =>
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    padding: 10,
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
