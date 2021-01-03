import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let url;
if (__DEV__) {
  url = 'http://3cc3de33145d.ngrok.io';
} else {
  url = '';
}

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
