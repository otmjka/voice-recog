import { type MainPageActions, type MainPageState } from './types';

import { ActionTypes } from './enums';

const mainPageReducer = (state: MainPageState, action: MainPageActions) => {
  switch (action.type) {
    case ActionTypes.add:
      return { ...state, memoList: [action.payload, ...state.memoList] };
    case ActionTypes.update:
      return { ...state, ...action.payload };
    default:
      console.log('unknown action', action);
      return state;
  }
};

export default mainPageReducer;
