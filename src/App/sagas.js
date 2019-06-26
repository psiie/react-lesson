import { put, takeLatest } from 'redux-saga/effects';
import { REDUX_ASYNC, REDUX_ASYNC_SUCCEEDED } from './constants';

function* fetch(action) {
  const int = yield new Promise(resolve => {
    setTimeout(() => {
      resolve(200); // 200 is returned in the far future. Async
    }, 1000);
  });
  
  yield put({ type: REDUX_ASYNC_SUCCEEDED, int });
}

function* sagas() {
  yield takeLatest(REDUX_ASYNC, fetch);
}

export default sagas;
