export const LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS";
export const SAVE_DATA_SUCCESS = "SAVE_DATA_SUCCESS";
export const LOAD_DATA = "LOAD_DATA";
export const SAVE_DATA = "SAVE_DATA";
export const SET_LOADING = "SET_LOADING";

export function loadDataSuccess(data) {
  return {
    type: LOAD_DATA_SUCCESS,
    data
  };
}

export function saveDataSuccess(data) {
  return {
    type: SAVE_DATA_SUCCESS,
    data
  };
}

export function loadData() {
  return {
    type: LOAD_DATA,
    data
  };
}

export function saveData(data) {
  return {
    type: SAVE_DATA,
    data
  };
}
