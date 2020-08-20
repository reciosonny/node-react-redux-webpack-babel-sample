import { all, spawn } from 'redux-saga/effects';

import employeesSaga from './employees';

export default function* rootSaga() {
  yield all([
    spawn(employeesSaga),
  ]);
}
