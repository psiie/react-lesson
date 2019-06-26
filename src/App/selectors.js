import { createSelector } from 'reselect';
import initialState from './reducer';

export const key = 'home';

const selectLocal = state => state[key] || initialState;

const selectCounter = () => createSelector(selectLocal, state => state.counter);

export { selectLocal, selectCounter };
