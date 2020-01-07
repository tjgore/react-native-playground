import React from 'react';
import { 
  StyleSheet,
  FlatList,
} from 'react-native';

import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from './../components/HeaderButton'

export default Categories = props => {
  const renderGridItem = (itemData) => {
    return (<CategoryGridTile title={itemData.item.title} color={itemData.item.color} onSelect={() => {
      props.navigation.navigate('CategoryMeal', {categoryId: itemData.item.id })
    }} />);
  }

  return(
    <FlatList 
      keyExtractor={(item) => item.id}  
      data={CATEGORIES} 
      renderItem={renderGridItem} numColumns={2}
    />
  );
};

Categories.navigationOptions = navData => {
  return {
    headerTitle: "Meal Categories",
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName="ios-menu" onPress={() => {
        navData.navigation.toggleDrawer()
      }}/>
    </HeaderButtons>
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' 
  }
});
