import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const updateStates = (state, action) => {
  return {
    ...state,
    loading: action.loading,
    error: action.error,
    data: [...action.data],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GAMES_FETCH_START:
      return updateStates(state, action);
    case actionTypes.GAMES_FETCH_SUCCESS:
      return updateStates(state, action);
    case actionTypes.GAMES_FETCH_FAILURE:
      return updateStates(state, action);
    case actionTypes.GAMES_UPDATE:
      return { ...state, data: [...state.data, action.game] };
    case actionTypes.GAMES_SET:
      return { ...state, data: [...action.games] };
    case actionTypes.GAMES_CLEAR_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default reducer;
