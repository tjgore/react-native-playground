import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native'
import TitleText from './../components/TitleText';
import BodyText from './../components/BodyText';
import Colors from './../constants/colors'
import MainButton from './../components/MainButton';

export default GameOver = props => {
  return(
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is over!</TitleText>
        <Image 
          style={styles.image} 
          resizeMode="contain"
          //source={require('./../assets/trophy.png')} 
          source={{uri: 'https://cdn3.vectorstock.com/i/1000x1000/53/27/trophy-cup-icon-vector-13465327.jpg'}}
        />
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
      
        <MainButton onPress={props.onRestart}> New Game </MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height / 10
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center'
  },
  resultContainer: {
    marginHorizontal: 20,
    marginVertical: 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
})