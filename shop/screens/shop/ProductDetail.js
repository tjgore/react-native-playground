import React from 'react';
import {View, Text, ScrollView, Image, Button, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const ProductDetail = props => {
  const product = props.navigation.getParam('product');
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }}/>
      <View style={styles.action}>
        <Button 
          color={Colors.primary} 
          title="Add To Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(product))
          }}
          />
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

ProductDetail.navigationOptions = navigationData => {
  const product = navigationData.navigation.getParam('product');

  return {
    headerTitle: product.title
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginHorizontal: 20,
    textAlign: 'center'
  },
  action: {
    marginVertical: 10,
    alignItems: 'center'
  }
});

export default ProductDetail;