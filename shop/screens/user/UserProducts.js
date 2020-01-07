import React from 'react';
import { FlatList, Button, Platform, Alert } from 'react-native';
import ProductItem from './../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProducts = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', { productId: id });
  }

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you want to delete this item?', [
      {
        text: 'No',
        style: 'default'
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id))
        }
      }
    ])
  }

  return (
    <FlatList 
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          product={itemData.item}
          onSelect={() => {
            editProductHandler(itemData.item.id)
          }}
        >
          <Button 
            color={Colors.primary} 
            title="Edit" 
            onPress={() => {
              editProductHandler(itemData.item.id)
            }}
          />
          <Button 
            color={Colors.primary} 
            title="Delete" 
            onPress={() => { deleteHandler(itemData.item.id) } }
          />
        </ProductItem>
      )}
    />
  );
}

UserProducts.navigationOptions = navData => {
  return {
    headerTitle: "Your Products",
    headerLeft:  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item 
      title="Menu" 
      iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
      onPress={() => navData.navigation.toggleDrawer()} 
    />
  </HeaderButtons>,
   headerRight:  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
   <Item 
     title="Add" 
     iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
     onPress={() => navData.navigation.navigate('EditProduct')} 
   />
 </HeaderButtons>,
  }
}

export default UserProducts;