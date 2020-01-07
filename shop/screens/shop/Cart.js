import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItems from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
import Card from '../../components/UI/Card';

const Cart = props => {
  const [isLoading, setLoading] = useState(false);

  cartTotalAmount = useSelector(state => state.cart.totalAmount);

  cartItems = useSelector(state => {
    const transformedItems = [];

    for (const key in state.cart.items) {
      transformedItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setLoading(false);
  }
 
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        {isLoading ?  (<ActivityIndicator size='small' color={Colors.primary}/>) :
          (<Button 
            color={Colors.secondary}
            title="Order Now" 
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />)
        }
      </Card>
      <View>
        <FlatList 
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => <CartItems 
              deletable
              item={itemData.item}
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId))
              }}
            />} 
        />
      </View>
    </View>
  );
}

Cart.navigationOptions = navData => {
  return {
    headerTitle: "Cart"
  }
}

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.secondary
  }
});

export default Cart;