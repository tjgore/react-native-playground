import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import TitleText from './TitleText';
import Colors from '../constants/colors';

export default Header = props => {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    paddingTop: 45,
    backgroundColor: Platform.OS === 'android' ? Colors.accent : Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Platform.OS === 'ios' ? 'transparent': '#ccc' ,
    borderBottomWidth:  Platform.OS === 'ios' ? 0 : 1
  }
});