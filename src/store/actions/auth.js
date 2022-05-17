import axios from '../../axios-default';

import * as actionTypes from './actionTypes';
import { httpStatusCodes } from '../../shared/Utilities/index';

const decodeToken = (jwt) => {
  const jwtDataPart = jwt.split('.')[1];
  const decodedJwtDataPart = Buffer.from(jwtDataPart, 'base64').toString();
  return JSON.parse(decodedJwtDataPart);
};

const isAuthenticated = (exp) => {
  try {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    if (exp < currentTime) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const isFullyAuthenticated = (exp) => {
  try {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const expirationTime = Math.floor(exp * 1.1);
    if (expirationTime < currentTime) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const authLogin = (
  username,
  password,
  setLoading,
  setError,
  isModal,
  modalClosed,
) => {
  return (dispatch) => {
    const body = {
      usernameOrEmail: username,
      password: password,
    };

    axios
      .post('Auth/Login', body)
      .then((response) => {
        if (response.status === httpStatusCodes.Ok) {
          if (setError) {
            setError(null);
          }
          if (setLoading) {
            setLoading(false);
          }
          if (isModal && modalClosed) {
            modalClosed();
          }
          return response.data.data;
        }
      })
      .then((responseData) => {
        const { exp } = decodeToken(responseData);
        localStorage.setItem('token', responseData);
        localStorage.setItem('exp', exp);

        dispatch(authLoginSuccess(responseData));
      })
      .catch((error) => {
        if (setError) {
          setError(error);
        }
        if (setLoading) {
          setLoading(false);
        }
      });
  };
};

export const authLoginSuccess = (token) => {
  return {
    type: actionTypes.AUTH_LOGIN,
    token,
  };
};

export const authCheckToken = () => {
  return (dispatch) => {
    const storedToken = localStorage.getItem('token');
    const exp = localStorage.getItem('exp');
    const token = isAuthenticated(exp) ? storedToken : null;

    if (token) {
      if (!isFullyAuthenticated(exp)) {
        dispatch(authLogin());
      }
    }

    dispatch(authLoginSuccess(token));
  };
};
