import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.HomePage || initialState;

export const selectLists = createSelector(
  [selectDomain],
  HomePageState => HomePageState.owlLists,
);
export const selectNewListName = createSelector(
  [selectDomain],
  HomePageState => HomePageState.newListName,
);
export const selectListToDelete = createSelector(
  [selectDomain],
  HomePageState => HomePageState.listToDelete,
);
export const selectError = createSelector(
  [selectDomain],
  HomePageState => HomePageState.error,
);
