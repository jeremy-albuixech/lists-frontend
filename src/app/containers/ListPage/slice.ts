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
import { ContainerState, OwlItemErrorType } from './types';
import { OwlItems } from 'owl-types/types/OwlItems';
import { OwlItem } from 'owl-types/types/OwlItem';

// The initial state of the ListPage container
export const initialState: ContainerState = {
  owlItems: { _id: '', items: [], list_id: '' },
  error: null,
  loading: false,
  newItemText: '',
  list_id: '',
};

const listPageSlice = createSlice({
  name: 'ListPage',
  initialState,
  reducers: {
    loadOwlItems(state) {
      state.loading = true;
      state.error = null;
    },
    /**
     * Removes an item from the list.
     * @param state
     * @param action:number, the index to remove from the items array.
     * @triggers the saga saveOwlListItems
     */
    deleteOwlItem(state, action: PayloadAction<number>) {
      state.owlItems.items.splice(action.payload, 1);
    },
    /**
     * Saves the item texts in state as the user types.
     * @param state
     * @param action:string, the text from the item input.
     */
    setNewItemText(state, action: PayloadAction<string>) {
      state.newItemText = action.payload;
    },
    /**
     * Resets the state to the defaults when component is unmounted.
     * @param state
     */
    cleanup(state) {
      state.owlItems = { _id: '', items: [], list_id: '' };
    },
    /**
     * Adds an item to the list. Sets the item status to pending until we get the response from the backend.
     * @param state
     * @param action:string, the item text.
     * @triggers the saga saveOwlListItems
     */
    addOwlItem(state, action: PayloadAction<string>) {
      if (action.payload.length > 0 && state.owlItems) {
        const newItem: OwlItem = {
          text: action.payload,
          status: 'pending',
        };
        state.owlItems.items.unshift(newItem);
      }
    },
    /**
     * Changes the order of the items array.
     * @param state
     * @param action:any, an object with the item id and whether to increase or decrease the item order.
     * @triggers the saga saveOwlListItems
     */
    changeOrder(state, action: PayloadAction<any>) {
      state.owlItems.items[action.payload.id].status = 'pending';
      state.owlItems.items.splice(
        action.payload.id - action.payload.inc,
        0,
        state.owlItems.items.splice(action.payload.id, 1)[0],
      );
    },
    /**
     * Empties the items array.
     * @param state
     * @triggers the saga saveOwlListItems
     */
    resetList(state) {
      state.owlItems.items = [];
    },
    editOwlItem(state, action: PayloadAction<any>) {
      if (state.owlItems) {
        let itemIndex = action.payload.id;
        state.owlItems.items[itemIndex] = action.payload.value;
      }
    },
    /**
     * Sets the list ID to load the corresponding items.
     * @param state
     * @param action:string, the list ID.
     * @triggers the saga loadOwlListItems
     */
    setListId(state, action: PayloadAction<string>) {
      state.loading = false;
      state.owlItems = { _id: '', items: [], list_id: '' };
      state.list_id = action.payload;
    },
    /**
     * Replaces the state owlItems with the ones loaded from the backend.
     * @param state
     * @param action:OwlItems, the OwlItems matching the current list ID.
     */
    owlItemsLoaded(state, action: PayloadAction<OwlItems>) {
      if (action.payload && action.payload._id) {
        state.owlItems = action.payload;
      }
      state.loading = false;
    },
    /**
     * Updates the state error property if an error is returned by the backend.
     * @param state
     * @param action:OwlItemErrorType, the error returned.
     */
    owlItemError(state, action: PayloadAction<OwlItemErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = listPageSlice;
