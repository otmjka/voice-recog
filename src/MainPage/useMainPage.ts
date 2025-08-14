import useMainPageState from './useMainPageState';
import { type UseMemoPageReturn } from './types';

const useMemoPage = (): UseMemoPageReturn => {
  const { mainPageState, addMemo } = useMainPageState();

  return {
    memoListState: { memoList: mainPageState.memoList },
    createNewState: { onAddNew: addMemo },
  };
};

export default useMemoPage;
