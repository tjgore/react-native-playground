import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalInput from './components/GoalInput'
import GoalItem from './components/GoalItem'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false)

  const addGoalHandler = (goal) => {
    setCourseGoals(currentGoals => [...currentGoals, { key: Math.random().toString(), value: goal}])
    setIsAddMode(false)
  }

  const removeGoalsHandler = (goalId) => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.key !== goalId)
    })
  }

  const cancelGoalAdd = () => {
    setIsAddMode(false)
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdd}/>

      <FlatList data={courseGoals} renderItem={itemData => (
        <GoalItem onDelete={removeGoalsHandler} goal={itemData}/>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 70
  },
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: '#8f8f8f',
    borderWidth: 2,
    marginVertical: 10 
  }
});
