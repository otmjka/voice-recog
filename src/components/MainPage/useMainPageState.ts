import { useCallback, useReducer } from 'react';
import type { AddMemoFormValue, AddMemoHandler, MemoId } from '../../types';
import mainPageReducer from './mainPageReducer';
import type { MainPageState } from './types';
import { ActionTypes } from './enums';

type UseMainPageStateReturn = {
  mainPageState: MainPageState;

  addMemo: AddMemoHandler;
  editMemo: (value: { id: MemoId }) => void;
  openEditMemoDialog: (isOpen: boolean) => void;
  updateState: (newState: Partial<MainPageState>) => void;
};

const initialState = {
  editMemoDialogOpened: false,
  editValue: undefined,
  memoList: [],
};

const useMainPageState = (): UseMainPageStateReturn => {
  const [state, dispatch] = useReducer(mainPageReducer, initialState);

  const handleAddMemo = useCallback((item: AddMemoFormValue) => {
    dispatch({
      type: ActionTypes.add,
      payload: item,
    });
  }, []);

  const handleUpdateState = useCallback((newState: Partial<MainPageState>) => {
    dispatch({
      type: ActionTypes.update,
      payload: newState,
    });
  }, []);

  const handleEditMemo = useCallback(
    ({ id }: { id: MemoId }) => {
      const memoToEdit = state.memoList.find((memo) => memo.id === id);
      if (memoToEdit) {
        handleUpdateState({
          editMemoDialogOpened: true,
          editValue: { ...memoToEdit },
        });
      }
    },
    [handleUpdateState, state.memoList],
  );

  const handleOpenEditMemoDialog = useCallback(
    (isOpen: boolean) =>
      handleUpdateState({
        editMemoDialogOpened: isOpen,
        ...(!isOpen ? { editValue: undefined } : {}),
      }),
    [handleUpdateState],
  );

  return {
    mainPageState: state,

    addMemo: handleAddMemo,
    editMemo: handleEditMemo,
    openEditMemoDialog: handleOpenEditMemoDialog,
    updateState: handleUpdateState,
  };
};

export default useMainPageState;
