import type {
  MemoListState,
  AddMemoHandler,
  AddMemoFormValue,
  OnRecordResultHandler,
} from '../../types';
import type { ActionTypes } from './enums';

export type CreateNewState = {
  editMemoDialogOpened: boolean;
  openEditMemoDialog: (isOpen: boolean) => void;
  formState: {
    value?: AddMemoFormValue;
    onSubmit: AddMemoHandler;
  };
};

export type UseMemoPageReturn = {
  onRecorderResult: OnRecordResultHandler;
  memoListState: MemoListState;
  createNewState: CreateNewState;
};

/* state */

export type MainPageState = {
  editValue?: AddMemoFormValue;
  editMemoDialogOpened: boolean;
  memoList: Array<AddMemoFormValue>;
};

type AddMemoAction = {
  type: ActionTypes.add;
  payload: AddMemoFormValue;
};

type UpdateStateAction = {
  type: ActionTypes.update;
  payload: Partial<MainPageState>;
};

export type MainPageActions = AddMemoAction | UpdateStateAction;
