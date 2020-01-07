import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default GoalItem = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => props.onDelete(props.goal.item.key)}>
      <View style={styles.listItem}>
        <Text>{props.goal.item.value}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: '#8f8f8f',
    borderWidth: 2,
    marginVertical: 10 
  }
});
