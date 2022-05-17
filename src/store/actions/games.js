import axios from '../../axios-default';

import * as actionTypes from './actionTypes';
import {
  httpStatusCodes,
  httpErrorMessages,
  initializeGames,
} from '../../shared/Utilities/index';

export const fetchGames = () => {
  return (dispatch) => {
    dispatch(fetchGamesStarted());
    axios
      .get('Games/GetGames')
      .then((response) => {
        if (response.status === httpStatusCodes.Ok) {
          const data = response.data.data;
          initializeGames(data);
          dispatch(fetchGamesSucceeded(data));
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(fetchGamesFailed(httpErrorMessages.BadResponse.statusCode));
        } else {
          dispatch(fetchGamesFailed(httpErrorMessages.NoResponse.statusCode));
        }
      });
  };
};

const fetchGamesStarted = () => {
  return {
    type: actionTypes.GAMES_FETCH_START,
    loading: true,
    error: null,
    data: [],
  };
};

const fetchGamesSucceeded = (data) => {
  return {
    type: actionTypes.GAMES_FETCH_SUCCESS,
    loading: false,
    error: null,
    data,
  };
};

const fetchGamesFailed = (error) => {
  return {
    type: actionTypes.GAMES_FETCH_FAILURE,
    loading: false,
    error,
    data: [],
  };
};

export const updateGames = (game) => {
  return {
    type: actionTypes.GAMES_UPDATE,
    game,
  };
};

export const setGames = (games) => {
  return {
    type: actionTypes.GAMES_SET,
    games,
  };
};

export const clearGamesError = () => {
  return {
    type: actionTypes.GAMES_CLEAR_ERROR,
    error: null,
  };
};
