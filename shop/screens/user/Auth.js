import React, { useEffect, useState, useReducer, useCallback } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Button, 
  StyleSheet,
  ActivityIndicator,
  Alert
 } from 'react-native';
 import { useDispatch } from 'react-redux'; 
 import {LinearGradient} from 'expo-linear-gradient';
 import * as authActions from '../../store/actions/auth';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const FORM_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let updatedFormIsValid = true;
    for(const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
}


const Auth = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(error) {
      Alert.alert('An error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error])

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
    } else {
      action = authActions.login(formState.inputValues.email, formState.inputValues.password);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
   
  };

  const inputChangedHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({ 
     type: FORM_UPDATE, 
     value: inputValue, 
     isValid: inputValidity, 
     input: inputIdentifier
     })
   }, [dispatchFormState]);

  const [formState, dispatchFormState] =  useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
     email: false,
     password: false
    },
    formIsValid: false,
  });

  return (
    <KeyboardAvoidingView 
      style={styles.screen}
      behavior='padding' 
      keyboardVerticalOffset={50}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              keyboardType='email-address'
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangedHandler}
              intialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangedHandler}
              intialValue=""
            />
            <View style={styles.buttonContainer}>
              { isLoading ? <ActivityIndicator size='small' color={Colors.primary}/> :
                (<Button
                  title={ isSignup ? 'Sign Up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />)
              }
            </View>
            <View  style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.secondary}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
    
  );
};

Auth.navigationOptions = (navData) => {
  return {
    headerTitle: 'Authenticate'
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 20
  }
});

export default Auth;