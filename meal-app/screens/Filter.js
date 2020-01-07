import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from './../components/HeaderButton'
import Colors from './../constants/Colors';
import { useSelector, useDispatch  } from 'react-redux';
import { setFilter } from './../store/actions/meals';

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch 
        trackColor={{true: Colors.primary}}
        thumbColor={Platform.OS === 'android' ? 'white' : ''}
        value={props.state} 
        onValueChange={props.onChange}/>
    </View>
  );
}


export default Filter = props => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    }
    dispatch(setFilter(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch])

  useEffect(() => {
    navigation.setParams({ save: saveFilters })
  }, [saveFilters])
  
  return(
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filter</Text>
      <FilterSwitch 
        label="Gluten-Free"
        state={isGlutenFree} 
        onChange={newValue => setIsGlutenFree(newValue)} 
      /> 
      <FilterSwitch 
        label="Lactose-Free" 
        state={isLactoseFree} 
        onChange={newValue => setIsLactoseFree(newValue)} 
      /> 
      <FilterSwitch 
        label="Vegetarian" 
        state={isVegetarian} 
        onChange={newValue => setIsVegetarian(newValue)} 
      /> 
      <FilterSwitch 
        label="Vegan" 
        state={isVegan} 
        onChange={newValue => setIsVegan(newValue)} 
      /> 
    </View>
  );
};

Filter.navigationOptions = navData => {
  return {
    headerTitle: "Filter",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title="Menu" 
          iconName="ios-menu" 
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title="Menu" 
          iconName="ios-save" 
          onPress={
            // pointer to the saveFilter
            navData.navigation.getParam('save')
          }
        />
      </HeaderButtons>
    ),
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    margin: 20,
    textAlign: 'center',
    fontSize: 22
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20
  }
});
