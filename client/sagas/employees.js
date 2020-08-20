import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { TYPES_ACTION_EMPLOYEES } from '../actions/employees';

const { LOAD_EMPLOYEES, LOAD_EMPLOYEES_SUCCESS, ADD_EMPLOYEES, ADD_EMPLOYEES_SUCCESS, UPDATE_EMPLOYEES, UPDATE_EMPLOYEES_SUCCESS, DELETE_EMPLOYEES, DELETE_EMPLOYEES_SUCCESS } = TYPES_ACTION_EMPLOYEES;

const delay = ms => new Promise(res => setTimeout(res, ms));


function* loadEmployees({ payload }) {
  try {

    const res = yield axios.get(`/api/employees`);

    yield put({ type: LOAD_EMPLOYEES_SUCCESS, payload: res.data});

  } catch (ex) {
    throw ex;
  }
}

function* addEmployee({ payload }) {
  try {

    const res = yield axios.post(`/api/employees`, { ...payload });

    yield put({ type: ADD_EMPLOYEES_SUCCESS, payload: res.data});

  } catch (ex) {
    throw ex;
  }
}

function* updateEmployee({ payload }) {
  try {

    const res = yield axios.put(`/api/employees/${payload._id}`, { ...payload });

    yield put({ type: UPDATE_EMPLOYEES_SUCCESS, payload: res.data });

  } catch (ex) {
    throw ex;
  }
}

function* deleteEmployee({ payload }) {
  try {

    const res = yield axios.delete(`/api/employees/${payload._id}`, { ...payload });

    
    yield put({ type: DELETE_EMPLOYEES_SUCCESS, payload: res.data});

  } catch (ex) {
    throw ex;
  }
}



export default function* clientSaga() {
  yield takeLatest(LOAD_EMPLOYEES, loadEmployees);
  yield takeLatest(ADD_EMPLOYEES, addEmployee);
  yield takeLatest(UPDATE_EMPLOYEES, updateEmployee);
  yield takeLatest(DELETE_EMPLOYEES, deleteEmployee);
}
