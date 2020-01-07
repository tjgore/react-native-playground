import React, { useState, useEffect } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView 
} from 'react-native';
import Card from './../components/Card';
import Input from './../components/Input';
import NumberContainer from './../components/NumberContainer';
import Colors from '../constants/colors';
import BodyText from './../components/BodyText';
import TitleText from './../components/TitleText';
import MainButton from './../components/MainButton';

export default StartGame = props => {

  const [enteredValue, setValue] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
  
    Dimensions.addEventListener('change', updateLayout);
    /* clean up and remove eventListener */
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });

  const numberInputHandler = inputText => {
    setValue(inputText.replace(/[^0-9]/g, ''))
  };

  const resetInputHandler = () => {
    setValue('');
    setConfirm(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || 
        chosenNumber <= 0 || 
        chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
      return;
    }

    setConfirm(true);
    setValue('');
    setSelectedNumber(parseInt(enteredValue));
    Keyboard.dismiss();
  };

  let confirmOutput;

  if (confirm) {
    confirmOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStart(selectedNumber)}>
          Start Game
        </MainButton>
      </Card>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
      <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
        }}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input 
                blurOnSubmit 
                autoCapitalize='none' 
                autoCorrect={false} 
                keyboardType="number-pad" 
                maxLength={2} 
                style={styles.input}
                onChangeText={numberInputHandler}
                value={enteredValue}/>
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button title="Confirm"  onPress={confirmInputHandler} color={Colors.primary}/>
                </View>
              </View>
            </Card>
            {confirmOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    color: 'grey',
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 15
  },
  button: {
    width: Dimensions.get('window').width / 4
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center'
  },
  input: {
    width: 80,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 10,
    alignItems: 'center'
  }
});