import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://react-native-shop-adcee.firebaseio.com/products.json');

      if (!response.ok) {
        throw new Error('something went wrong');
      }

      const resData = await response.json();

      console.log(resData);
      loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(new Product(
          key,
          'u1', 
          resData[key].title,
          resData[key].imageUrl, 
          resData[key].description, 
          resData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      // log on server
      throw error;
    }
  }
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`https://react-native-shop-adcee.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      throw new Error('something went wrong');
    }

    dispatch({ type: DELETE_PRODUCT, pid:productId })
  }
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`https://react-native-shop-adcee.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    });

    const resData = await response.json();

    //console.log(resData);

    dispatch ({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title: title,
        description: description,
        imageUrl,
        price
      }
    });
  };
}

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {

     console.log(getState());
    const token = getState().auth.token;

    const response = await fetch(`https://react-native-shop-adcee.firebaseio.com/products/${id}.json?auth=${token}`, {
      method: 'PATCH',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
      })
    });

    if (!response.ok) {
      throw new Error('something went wrong');
    }

    dispatch ({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title: title,
        description: description,
        imageUrl
      }
    })
  };
  
}