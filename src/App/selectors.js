import { createSelector } from 'reselect';
import initialState from './reducer';

export const key = 'home';

// const selectLocal = state => state[key] || initialState;
const selectLocal = state => state.home

const selectCounter = () => createSelector(selectLocal, state => state.counter);

const selectFavoriteCookie = () => createSelector(selectLocal, state => state.cookie);

export { selectLocal, selectCounter, selectFavoriteCookie };
