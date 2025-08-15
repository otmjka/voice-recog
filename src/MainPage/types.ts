import type { MemoListState, AddMemoHandler } from '../types';

export type CreateNewState = { onSubmit: AddMemoHandler };

export type MainPageState = {
  memoListState: MemoListState;
  createNewState: CreateNewState;
};

export type UseMemoPageReturn = MainPageState;
