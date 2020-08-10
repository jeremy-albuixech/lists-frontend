import { put, select, takeLatest, delay, retry } from 'redux-saga/effects';
import { request } from 'utils/request';
import { selectOwlListId, selectItems } from './selectors';
import { actions } from './slice';
import { OwlItems } from 'owl-types/types/OwlItems';

const SECOND = 1000;

/**
 * Loads all the owlItems from the backend
 */
export function* loadOwlListItems() {
  const list_id = yield select(selectOwlListId);
  const requestURL = `${process.env.REACT_APP_API_URL}/item/${list_id._id}?nocache=true`;
  try {
    const allListItems: OwlItems = yield retry(
      3,
      5 * SECOND,
      request,
      requestURL,
      {
        method: 'get',
      },
    );
    yield put(actions.owlItemsLoaded(allListItems));
  } catch (err) {
    yield put(actions.owlItemError(err.response.status));
  }
}

/**
 * Debounce the save owl list items to let the user type.
 */
export function* delaySave() {
  yield delay(1000);
  yield put(actions.markAsPending());
  yield saveOwlListItems();
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
    const allListItems: OwlItems = yield retry(
      3,
      5 * SECOND,
      request,
      requestURL,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      },
    );
    yield put(actions.owlItemsLoaded(allListItems));
  } catch (err) {
    yield put(actions.owlItemError(err.response.status));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* owlItemSaga() {
  yield takeLatest(actions.setListId.type, loadOwlListItems);
  yield takeLatest(actions.addOwlItem.type, saveOwlListItems);
  yield takeLatest(actions.changeOrder.type, saveOwlListItems);
  yield takeLatest(actions.resetList.type, saveOwlListItems);
  yield takeLatest(actions.deleteOwlItem.type, saveOwlListItems);
  yield takeLatest(actions.editOwlItem.type, delaySave);
}
