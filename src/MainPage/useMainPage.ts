import useMainPageState from './useMainPageState';
import { type UseMemoPageReturn } from './types';
import type { AddMemoHandler } from '@/types';

const useMemoPage = (): UseMemoPageReturn => {
  const { mainPageState, addMemo } = useMainPageState();

  const handleAddMemo: AddMemoHandler = (value) => {
    addMemo(value);
  };

  return {
    memoListState: { memoList: mainPageState.memoList },
    createNewState: { onSubmit: handleAddMemo },
  };
};

export default useMemoPage;
