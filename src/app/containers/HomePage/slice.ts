/*
 * ListPage Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, OwlListErrorType } from './types';
import { OwlList } from 'owl-types/types/OwlList';

// The initial state of the HomePage container
export const initialState: ContainerState = {
  owlLists: [],
  error: null,
  loading: false,
  newListName: '',
  listToDelete: '',
};

const homePageSlice = createSlice({
  name: 'HomePage',
  initialState,
  reducers: {
    loadOwlLists(state) {
      state.loading = true;
      state.error = null;
    },
    deleteOwlList(state, action: PayloadAction<string>) {
      state.listToDelete = action.payload;
    },
    loadList(state, action: PayloadAction<OwlList>) {
      console.log(action);
    },
    setNewListName(state, action: PayloadAction<string>) {
      state.newListName = action.payload;
    },
    createNewList(state, action: PayloadAction<string>) {
      console.log(action);
    },
    editOwlItem(state, action: PayloadAction<any>) {},
    owlListsLoaded(state, action: PayloadAction<OwlList[]>) {
      state.loading = false;
      state.owlLists = action.payload;
    },
    listError(state, action: PayloadAction<OwlListErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = homePageSlice;
