import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native'

export default GoalInput = (props) => {
  const [enteredGoal, setGoal] = useState('')

  const goalInputHandler = (enteredText) => {
    setGoal(enteredText)
  }

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal)
    setGoal('')
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Course Goal"
          style={styles.input} 
          onChangeText={goalInputHandler} 
          value={enteredGoal} />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button color="red" title="cancel" onPress={props.onCancel}/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    width: `80%`,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%'
  },
  button: {
    width: '40%'
  }
});
