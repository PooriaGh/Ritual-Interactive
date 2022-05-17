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
    case actionTypes.NEWS_FETCH_START:
      return updateStates(state, action);
    case actionTypes.NEWS_FETCH_SUCCESS:
      return updateStates(state, action);
    case actionTypes.NEWS_FETCH_FAILURE:
      return updateStates(state, action);
    case actionTypes.NEWS_UPDATE:
      return { ...state, data: [...state.data, action.newItem] };
    case actionTypes.NEWS_SET:
      return { ...state, data: [...action.news] };
    case actionTypes.NEWS_CLEAR_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default reducer;
