import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { selectNewListName, selectListToDelete } from './selectors';
import { actions } from './slice';
import { OwlList } from 'owl-types/types/OwlList';
import { OwlListErrorType } from './types';

/**
 * Loads all the lists from the backend
 */
export function* loadLists() {
  const requestURL = `${process.env.REACT_APP_API_URL}/list?nocache=true`;
  try {
    const allLists: OwlList[] = yield call(request, requestURL, {
      method: 'get',
    });
    yield put(actions.owlListsLoaded(allLists));
  } catch (err) {
    yield put(actions.listError(err.response.status));
  }
}

/**
 * Delete a list from the backend
 */
export function* deleteList() {
  const list_id: string = yield select(selectListToDelete);
  const requestURL = `${process.env.REACT_APP_API_URL}/list/${list_id}`;
  try {
    yield call(request, requestURL, {
      method: 'delete',
    });
  } catch (err) {
    yield put(actions.listError(err.response.status));
  }
  yield loadLists();
}
/**
 * Create a new list.
 */
export function* createList() {
  // Select list name from store
  const newListName: string = yield select(selectNewListName);
  if (newListName.length === 0) {
    yield put(actions.listError(OwlListErrorType.MISSING_PARAM));
    return;
  }
  const requestURL = `${process.env.REACT_APP_API_URL}/list`;
  const requestBody = { name: newListName };
  try {
    yield call(request, requestURL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    yield put(actions.loadOwlLists());
  } catch (err) {
    yield put(actions.listError(err.response.status));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* owlListSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.createNewList.type, createList);
  yield takeLatest(actions.loadOwlLists.type, loadLists);
  yield takeLatest(actions.deleteOwlList.type, deleteList);
}
