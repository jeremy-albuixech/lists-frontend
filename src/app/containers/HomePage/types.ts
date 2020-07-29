import { OwlList } from 'owl-types/types/OwlList';

/* --- STATE --- */
export interface HomePageState {
  owlLists: OwlList[];
  error?: OwlListErrorType | null;
  loading: boolean;
  newListName: string;
  listToDelete: string;
}

export enum OwlListErrorType {
  NAME_EMPTY = 1,
  RESPONSE_ERROR = 2,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = HomePageState;
