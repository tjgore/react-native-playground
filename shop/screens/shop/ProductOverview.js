import React, { useEffect, useState, useCallback } from 'react';
import { 
  View,
  Text,
  FlatList, 
  Button, 
  Platform, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from './../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const ProductOverview = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [err, setError] = useState();
  const products = useSelector(state => state.products.availableProducts)
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);

    try {
      await dispatch(productActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts)

    return () => {
      willFocusSub.remove();
    }
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => {
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (product) => {
    props.navigation.navigate('ProductDetail', {
      product: product
    })
  }

  if (err) {
    return (
      <View style={styles.centered}>
        <Text color='red'>An error occurred! Try again</Text>
        <Button title='Try Again' color={Colors.primary} onPress={loadProducts}/>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe, start adding some.</Text>
      </View>
    )
  }

  return (
    <FlatList 
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products} 
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          onSelect={() => {
            selectItemHandler(itemData.item)
          }}
          product={itemData.item}
        >
          <Button 
            color={Colors.primary} 
            title="Details" 
            onPress={() => {
              selectItemHandler(itemData.item)
            }}
          />
          <Button 
            color={Colors.primary} 
            title="Add To Cart" 
            onPress={() => {
              console.log("Add to cart state");
              dispatch(cartActions.addToCart(itemData.item))
            }}
          />
        </ProductItem> 
      )} 
    />
  );
};

ProductOverview.navigationOptions = (navigationData) => {

  return {
    headerTitle: "All Products",
    headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
        title="Cart" 
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => navigationData.navigation.navigate('Cart')} 
      />
    </HeaderButtons>,
    headerLeft:  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item 
      title="Menu" 
      iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
      onPress={() => navigationData.navigation.toggleDrawer()} 
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
})

export default ProductOverview;