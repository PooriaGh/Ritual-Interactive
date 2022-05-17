import * as actionTypes from '../actions/actionTypes';

const initialState = {
  language: true,
  redirectPath: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LANGUAGE_TOGGLE:
      return {
        ...state,
        language: !state.language,
      };
    default:
      return state;
  }
};

export default reducer;
