import { LOAD_DATA_SUCCESS, SAVE_DATA_SUCCESS, SET_LOADING } from "./actions";

export const initialState = {
  transfers: [],
  isLoading: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS: {
      return {
        ...state,
        transfers: action.data
      };
    }
    case SAVE_DATA_SUCCESS: {
      return {
        ...state,
        transfers: [...state.transfers, action.data],
        saved: true
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.data
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
