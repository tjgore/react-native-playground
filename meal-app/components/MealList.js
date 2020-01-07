import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import MealItem from './MealItem';
import { useSelector } from 'react-redux';

export default MealList = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  const renderMealItem = itemData => {
    const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
    return (
      <MealItem 
        meal={itemData.item} 
        onSelectMeal={() => {
          props.navigation.navigate('MealDetails', {
          mealId: itemData.item.id, 
          mealTitle: itemData.item.title,
          isFav: isFavorite
        })
      }}/>);
  };

  return (
    <View style={styles.list}>
      <FlatList 
        data={props.listData} 
        keyExtractor={item => item.id} 
        renderItem={renderMealItem}
        style={{ width: '100%', padding: 10}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
