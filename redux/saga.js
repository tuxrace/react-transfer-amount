/* global fetch */

import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";

import {
  LOAD_DATA,
  SAVE_DATA,
  saveDataSuccess,
  loadDataSuccess,
  SET_LOADING
} from "./actions";

function* loadDataSaga() {
  try {
    const res = yield axios.get("http://localhost:3000/api/transfers");
    const data = yield res.data;
    yield put(loadDataSuccess(data));
  } catch (err) {
    // yield put(failure(err));
  }
}

function* saveData(action) {
  try {
    yield put({ type: SET_LOADING, data: true });
    yield axios.post("http://localhost:3000/api/transfers", action.data);
    yield saveDataSuccess(action.data);
    yield delay(1000);
    yield put({ type: SET_LOADING, data: false });
    yield notification.open({
      message: "Success",
      description: "Amount has been transfered"
    });
  } catch (err) {}
}
function* rootSaga() {
  yield all([
    takeLatest(LOAD_DATA, loadDataSaga),
    takeLatest(SAVE_DATA, saveData)
  ]);
}

export default rootSaga;
