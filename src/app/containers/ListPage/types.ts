import { OwlItems } from 'owl-types/types/OwlItems';

/* --- STATE --- */
export interface ListPageState {
  owlItems: OwlItems;
  error?: OwlItemErrorType | null;
  loading: boolean;
  newItemText: string;
  list_id: string;
}

export enum OwlItemErrorType {
  NAME_EMPTY = 1,
  RESPONSE_ERROR = 2,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = ListPageState;
