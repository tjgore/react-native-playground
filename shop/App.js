import React, { useState} from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './navigation/shopNavigator';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

enableScreens();

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer
});

// enable thunk to use async 
const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); 

const fecthFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return (
    <AppLoading 
      startAsync={fecthFonts} 
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)}
    />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}
