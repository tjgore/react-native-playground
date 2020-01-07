import React from 'react';
import { Platform } from 'react-native';
import Colors from './../constants/Colors';

import { createAppContainer, createSwitchNavigator, createNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ProductOverviewScreen from './../screens/shop/ProductOverview';
import ProductDetailScreen from './../screens/shop/ProductDetail';
import CartScreen from './../screens/shop/Cart';
import OrdersScreen from './../screens/shop/Orders';
import UserProductsScreen from './../screens/user/UserProducts';
import EditProductScreen from './../screens/user/EditProduct';


import { Ionicons } from '@expo/vector-icons';
import AuthScreen from '../screens/user/Auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavOptions
});

const OrderNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
  UserProducts: UserProductsScreen,
  EditProduct: EditProductScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrderNavigator,
  Admin: AdminNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
});

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);