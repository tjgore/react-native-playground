import React, { useState, useEffect } from 'react';
import { FlatList, Platform, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import OrderItem from './../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/order';
import Colors from '../../constants/Colors';

const Orders = props => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders())
    .then(() => {
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary}/>
      </View>
    )
  }

  return (
    <FlatList 
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem 
          items={itemData.item.items}
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
        />
      )}
    />
  );
}

Orders.navigationOptions = navData => {
  return {
    headerTitle: "Orders",
    headerLeft:  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item 
      title="Menu" 
      iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
      onPress={() => navData.navigation.toggleDrawer()} 
    />
  </HeaderButtons>,
  };
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Orders;