import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default TitleText = props => <Text style={{...styles.title, ...props.style}}>{props.children}</Text> 

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontFamily: 'open-sans-bold'
  }
})