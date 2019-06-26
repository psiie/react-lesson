import { combineReducers } from 'redux';

/* We must have a reducer for combineReducers. at times, injectedReducers
can contain no reducers. We need at least one. */
const globalReducer = () => ({});

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    globalReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
