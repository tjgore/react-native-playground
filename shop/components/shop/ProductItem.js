import React from 'react';
import { 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableNativeFeedback, 
  Platform 
} from 'react-native';
import Card from '../UI/Card'

const ProductItem = props => {

  const TouchableCmp = (Platform.OS === 'android' && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <TouchableCmp onPress={props.onSelect}>
      <Card style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.product.imageUrl }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.product.title}</Text>
          <Text style={styles.price}>${props.product.price}</Text>
        </View>
        <View style={styles.actions}>
          {props.children}
        </View>
      </Card>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  product: {
    backgroundColor: 'white',
    height: 300,
    margin: 20
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: '25%'
  }
});

export default ProductItem;