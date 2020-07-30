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
  MISSING_PARAM = 400,
  RESPONSE_ERROR = 500,
  NOTFOUND_ERROR = 404,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = HomePageState;
