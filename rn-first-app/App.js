import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [toggleText, toggle] = useState(true)
  return (
    <View style={styles.container}>
      <Text>{
        toggleText ? 'Hello, Open up App.js to start working on your app!': "Text changed!"
      }</Text>
      <Button title="Change Text" onPress={() => toggle(!toggleText)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
