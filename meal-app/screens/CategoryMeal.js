import React from 'react';
import  { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
// can also use connect and mapStateToProps etc
// useSelector is leaner 
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';
import { View, StyleSheet } from 'react-native';

const CategoryMeal = props => {

  const catId = props.navigation.getParam('categoryId');

  // get piece of the state
  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

  if (displayMeals.length ===0 ) {
    return(
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters.</DefaultText>
      </View>
    );
  }

  return (
   <MealList listData={displayMeals} navigation={props.navigation}/>
  );
};

CategoryMeal.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

  return {
    headerTitle: selectedCategory.title,
  }; 
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoryMeal;