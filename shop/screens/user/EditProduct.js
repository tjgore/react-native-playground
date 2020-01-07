import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useReducer 
} from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  ScrollView, 
  StyleSheet, 
  Platform, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from './../../store/actions/products';
import Input from '../../components/UI/Input';
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

const EditProduct = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const prodId = props.navigation.getParam('productId');
  const editProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );

  const [formState, dispatchFormState] =  useReducer(formReducer, {
    inputValues: {
      title: editProduct ? editProduct.title : '',
      imageUrl: editProduct ? editProduct.imageUrl : '',
      description: editProduct ? editProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editProduct ? true: false,
      imageUrl: editProduct ? true : false,
      description: editProduct ? true : false,
      price:  editProduct ? true: false
    },
    formIsValid: editProduct ? true: false,
  });

  const submitHandler = useCallback( async () => {
    if(!formState.formIsValid) {
      Alert.alert('Wrong input', 'Please check your form for errors',
        [{ text: 'Ok'}]
      );
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      if (editProduct) {
        await dispatch(productActions.updateProduct(
          prodId, 
          formState.inputValues.title, 
          formState.inputValues.description, 
          formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description, 
          formState.inputValues.imageUrl, 
          +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);

  }, [prodId, dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({'submit': submitHandler})
  }, [submitHandler]);

  useEffect(() => {
    if(error) {
      Alert.alert('An error occurred!', error);
    }
  }, [error])

  const inputChangedHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
   dispatchFormState({ 
    type: FORM_UPDATE, 
    value: inputValue, 
    isValid: inputValidity, 
    // shoul be the same as the useReducer inputValues key
    // which reducer to update
    //input: 'title' 
    input: inputIdentifier
    })
  }, [dispatchFormState]);

  if (isLoading) {
    return <View style={styles.centered}><ActivityIndicator size='large' color={Colors.primary}/></View>
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            errorText="Please enter a valid title"
            onInputChange={inputChangedHandler}
            initialValue={editProduct ? editProduct.title : ''}
            initiallyValid={!!editProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            returnKeyType='next'
            errorText="Please enter a valid image url"
            onInputChange={inputChangedHandler}
            initialValue={editProduct ? editProduct.imageUrl : ''}
            initiallyValid={!!editProduct}
            required
          />
          {!editProduct && <Input
            id="price"
            label="Price"
            returnKeyType='next'
            errorText="Please enter a valid price"
            keyboardType='decimal-pad'
            onInputChange={inputChangedHandler}
            required
            min={0.1}
          />}
          <Input
            id="description"
            label="Description"
            autoCapitalize='sentences'
            autoCorrect
            errorText="Please enter a valid description"
            multiline
            numberOfLines={3}
            onInputChange={inputChangedHandler}
            initialValue={editProduct ? editProduct.description : ''}
            initiallyValid={!!editProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProduct.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight:  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item 
      title="Save" 
      iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
      onPress={submitFn} 
    />
    </HeaderButtons>,
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditProduct;