import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.qty}>{props.item.quantity}</Text> 
        <Text style={styles.mainText}>{props.item.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{props.item.sum}</Text>
        { props.deletable && <TouchableOpacity onPress={props.onRemove}
          style={styles.deleteButton}
        >
          <Ionicons 
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  qty: {
    fontFamily: 'open-sans-bold',
    color: Colors.secondary,
    paddingRight: 10,
    fontSize: 16
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteButton: {
    margin: 20
  }
});

export default CartItem;