import axios from 'axios';

// export const baseURL = 'https://soroushborhan.ir/';
export const baseURL = 'https://ritual-interactive.com/';

const instance = axios.create({
  baseURL: baseURL + 'api/',
});

export const authAxios = axios.create({
  baseURL: baseURL + 'api/',
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export default instance;
