import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView, Dimensions } from 'react-native';
import NumberContainer from './../components/NumberContainer';
import Card from './../components/Card';
import BodyText from './../components/BodyText';
import MainButton from './../components/MainButton';

import { Ionicons } from '@expo/vector-icons';

const generateRandom = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max- min) + min)

  if (randomNumber === exclude) {
    return generateRandom(min, max, exclude);
  } else {
    return randomNumber;
  }
}

const renderListItem = (value, numbofRound) => (
<View key={value} style={styles.listItem}>
  <BodyText>#{numbofRound}</BodyText>
  <BodyText>{value}</BodyText>
</View>
)

export default Game = props => {
  const initialGuess = generateRandom(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availDeviceWidth, setAvailDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availDeviceHeight, setAvailDeviceHeight] = useState(
    Dimensions.get('window').height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailDeviceHeight(Dimensions.get('window').height)
      setAvailDeviceWidth(Dimensions.get('window').width)
    }

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change',updateLayout );
    }
  })

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, props.userChoice, props.onGameOver]);

  const nextGuess = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert(
        "Invalid",
        "You know that this is wrong..", [{ text: "Sorry", style: 'cancel'}]
        );
        return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandom(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
  }

  if (availDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <BodyText>Opponent Guess</BodyText>
        
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuess('lower')}>
            <Ionicons name="md-remove" size={24} color="white"/>
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuess('greater')}>
            <Ionicons name="md-add" size={24} color="white"/>
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length -index))}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <BodyText>Opponent Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuess('lower')}>
          <Ionicons name="md-remove" size={24} color="white"/>
        </MainButton>
        <MainButton onPress={() => nextGuess('greater')}>
          <Ionicons name="md-add" size={24} color="white"/>
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length -index))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20: 5,
    width: 200,
    maxWidth: '60%'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '80%' : '60%'
  },
  list: {
    alignItems: 'center'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center'
  }
})