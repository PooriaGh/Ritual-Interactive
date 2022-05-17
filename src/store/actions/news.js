import axios from '../../axios-default';

import * as actionTypes from './actionTypes';
import {
  httpStatusCodes,
  httpErrorMessages,
  initializeNews,
} from '../../shared/Utilities/index';

export const fetchNews = () => {
  return (dispatch) => {
    dispatch(fetchNewsStarted());
    axios
      .get('News/GetNewsArticles')
      .then((response) => {
        if (response.status === httpStatusCodes.Ok) {
          return response.data.data;
        }
      })
      .then((responseData) => {
        initializeNews(responseData);
        dispatch(fetchNewsSucceeded(responseData));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(fetchNewsFailed(httpErrorMessages.BadResponse.statusCode));
        } else {
          dispatch(fetchNewsFailed(httpErrorMessages.NoResponse.statusCode));
        }
      });
  };
};

const fetchNewsStarted = () => {
  return {
    type: actionTypes.NEWS_FETCH_START,
    loading: true,
    error: null,
    data: [],
  };
};

const fetchNewsSucceeded = (data) => {
  return {
    type: actionTypes.NEWS_FETCH_SUCCESS,
    loading: false,
    error: null,
    data,
  };
};

const fetchNewsFailed = (error) => {
  return {
    type: actionTypes.NEWS_FETCH_FAILURE,
    loading: false,
    error,
    data: [],
  };
};

export const updateNews = (newItem) => {
  return {
    type: actionTypes.NEWS_UPDATE,
    newItem,
  };
};

export const setNews = (news) => {
  return {
    type: actionTypes.NEWS_SET,
    news,
  };
};

export const clearNewsError = () => {
  return {
    type: actionTypes.NEWS_CLEAR_ERROR,
    error: null,
  };
};
