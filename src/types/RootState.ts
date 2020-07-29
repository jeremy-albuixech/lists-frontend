// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { ListPageState } from 'app/containers/ListPage/types';
import { HomePageState } from 'app/containers/HomePage/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  ListPage?: ListPageState;
  HomePage?: HomePageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
