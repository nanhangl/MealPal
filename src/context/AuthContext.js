import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import mealpalApi from '../api/mealpal';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('Home');
  } else {
    navigate('Welcome');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async ({ role, email, phone, line1, line2, postal }) => {
  try {
    const response = await mealpalApi.post('/signup', { role, email, phone, line1, line2, postal });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('role', role);
    await AsyncStorage.setItem('email', email);
    dispatch({ type: 'signin', payload: response.data.token });

    navigate('Home');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const signin = dispatch => async ({ role, email }) => {
  try {
    const response = await mealpalApi.post('/signin', { role, email });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('role', role);
    await AsyncStorage.setItem('email', email);
    dispatch({ type: 'signin', payload: response.data.token });
    navigate('Home');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
