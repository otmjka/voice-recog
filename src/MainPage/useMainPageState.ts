import { useReducer } from 'react';
import type { AddMemoHandler, MemoRecord } from '../types';

const initialArg = {
  memoList: [],
};

type MainPageState = {
  memoList: Array<MemoRecord>;
};
enum ActionTypes {
  add = 'add',
}

type AddMemoAction = {
  type: ActionTypes.add;
  payload: MemoRecord;
};

type MainPageActions = AddMemoAction;
const reducer = (state: MainPageState, action: MainPageActions) => {
  switch (action.type) {
    case ActionTypes.add:
      return { ...state, memoList: [action.payload, ...state.memoList] };
  }
};

type UseMainPageStateReturn = {
  mainPageState: MainPageState;

  addMemo: AddMemoHandler;
};

const useMainPageState = (): UseMainPageStateReturn => {
  const [state, dispatch] = useReducer(reducer, initialArg);

  const handleAddMemo = (item: MemoRecord) => {
    dispatch({
      type: ActionTypes.add,
      payload: item,
    });
  };
  return {
    mainPageState: state,
    addMemo: handleAddMemo,
  };
};

export default useMainPageState;
