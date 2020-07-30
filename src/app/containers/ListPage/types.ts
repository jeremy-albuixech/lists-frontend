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
  MISSING_PARAM = 400,
  RESPONSE_ERROR = 500,
  NOTFOUND_ERROR = 404,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = ListPageState;
