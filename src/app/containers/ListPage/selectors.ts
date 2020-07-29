import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.ListPage || initialState;

export const selectItems = createSelector(
  [selectDomain],
  ListPageState => ListPageState.owlItems,
);
export const selectError = createSelector(
  [selectDomain],
  ListPageState => ListPageState.error,
);
export const selectOwlListId = createSelector(
  [selectDomain],
  ListPageState => ListPageState.list_id,
);
export const selectItemText = createSelector(
  [selectDomain],
  ListPageState => ListPageState.newItemText,
);
export const selectListItems = createSelector(
  [selectDomain],
  ListPageState => ListPageState.owlItems,
);
