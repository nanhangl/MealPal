import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let url;
if (__DEV__) {
  url = 'http://4f8f303b4a57.ngrok.io';
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
