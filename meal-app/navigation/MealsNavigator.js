import React from 'react'
import { Text, Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/Categories'
import CategoryMealScreen from '../screens/CategoryMeal'
import MealDetailsScreen from '../screens/MealDetails'
import FavoritesScreen from '../screens/Favorites'
import FilterScreen from '../screens/Filter'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const MealNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeal: {
    screen: CategoryMealScreen
  },
  MealDetails: MealDetailsScreen
}, {
  defaultNavigationOptions: defaultStackOptions
});

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetails: MealDetailsScreen
},  {
  defaultNavigationOptions: defaultStackOptions
})

const MealsFavTabNavigator = createBottomTabNavigator({
  Meals: {
    screen: MealNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={23} color={tabInfo.tintColor} />;
      }
    }
  },
  Favorite: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={23} color={tabInfo.tintColor} />;
      }
    }
  }
},
  {
    tabBarOptions: {
      activeTintColor: Colors.accent,
      inactiveTintColor: 'white',
      labelStyle: {
        fontFamily: 'open-sans-bold'
      },
      style: {
        backgroundColor: Colors.primary,
        paddingBottom: 5
      },
    }
  });

  const FiltersNavigator = createStackNavigator({
    Filters: FilterScreen
  }, {

    defaultNavigationOptions: defaultStackOptions
  });

const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filter: FiltersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accent,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});

export default createAppContainer(MainNavigator);