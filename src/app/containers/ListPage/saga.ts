import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { selectOwlListId, selectItems } from './selectors';
import { actions } from './slice';
import { OwlItems } from 'owl-types/types/OwlItems';
/**
 * Loads all the owlItems from the backend
 */
export function* loadOwlListItems() {
  const list_id = yield select(selectOwlListId);
  const requestURL = `${process.env.REACT_APP_API_URL}/list/${list_id._id}`;
  try {
    const allListItems: OwlItems = yield call(request, requestURL, {
      method: 'get',
    });
    yield put(actions.owlItemsLoaded(allListItems));
  } catch (err) {
    yield put(actions.owlItemError(err.response.status));
  }
}

/**
 * Saves the owlItems to the backend.
 */
export function* saveOwlListItems() {
  // TODO: Remove next line, used for demo purpose only.
  yield delay(1500);
  const modifiedOwlListItems: OwlItems = yield select(selectItems);
  const requestURL = `${process.env.REACT_APP_API_URL}/item`;
  const list_id = yield select(selectOwlListId);
  const requestBody = {
    items: modifiedOwlListItems.items || [],
    list_id: list_id,
    id: modifiedOwlListItems._id,
  };
  try {
    yield call(request, requestURL, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
  } catch (err) {
    yield put(actions.owlItemError(err.response.status));
  }
  yield loadOwlListItems();
}

/**
 * Root saga manages watcher lifecycle
 */
export function* owlItemSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.setListId.type, loadOwlListItems);
  yield takeLatest(actions.addOwlItem.type, saveOwlListItems);
  yield takeLatest(actions.changeOrder.type, saveOwlListItems);
  yield takeLatest(actions.resetList.type, saveOwlListItems);
  yield takeLatest(actions.deleteOwlItem.type, saveOwlListItems);
}
