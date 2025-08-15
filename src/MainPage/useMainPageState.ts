import { useCallback, useReducer } from 'react';
import type { AddMemoFormValue, AddMemoHandler } from '../types';

const initialArg = {
  memoList: [],
};

type MainPageState = {
  memoList: Array<AddMemoFormValue>;
};

enum ActionTypes {
  add = 'add',
  update = 'update',
}

type AddMemoAction = {
  type: ActionTypes.add;
  payload: AddMemoFormValue;
};

type UpdateStateAction = {
  type: ActionTypes.update;
  payload: Partial<MainPageState>;
};

type MainPageActions = AddMemoAction | UpdateStateAction;

const reducer = (state: MainPageState, action: MainPageActions) => {
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

type UseMainPageStateReturn = {
  mainPageState: MainPageState;

  addMemo: AddMemoHandler;
  updateState: (newState: Partial<MainPageState>) => void;
};

const useMainPageState = (): UseMainPageStateReturn => {
  const [state, dispatch] = useReducer(reducer, initialArg);

  const handleAddMemo = (item: AddMemoFormValue) => {
    dispatch({
      type: ActionTypes.add,
      payload: item,
    });
  };

  const handleUpdateState = useCallback((newState: Partial<MainPageState>) => {
    dispatch({
      type: ActionTypes.update,
      payload: newState,
    });
  }, []);

  return {
    mainPageState: state,

    addMemo: handleAddMemo,
    updateState: handleUpdateState,
  };
};

export default useMainPageState;
