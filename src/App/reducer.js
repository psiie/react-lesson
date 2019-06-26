import { SET_COUNTER, REDUX_ASYNC_SUCCEEDED } from './constants';

export const initialState = {
  counter: 1,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COUNTER:
      return { ...state, counter: action.int };
    case REDUX_ASYNC_SUCCEEDED:
      return { ...state, counter: action.int };
    default:
      return state;
  }
}

export default reducer;