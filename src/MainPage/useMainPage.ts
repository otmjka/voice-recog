import useMainPageState from './useMainPageState';
import { type UseMemoPageReturn } from './types';
import type { AddMemoHandler } from '@/types';

import { localDbService } from '@/services/LocalDbService';
import { useEffect } from 'react';

const useMainPage = (): UseMemoPageReturn => {
  const { mainPageState, addMemo, updateState } = useMainPageState();

  // init
  useEffect(() => {
    localDbService.getMemos({ size: 10, offset: 0 }, (fetchedItems) => {
      updateState({ memoList: fetchedItems });
      console.log('###', fetchedItems);
    });
  }, [updateState]);

  const handleAddMemo: AddMemoHandler = (value) => {
    localDbService.addMemo(value);
    addMemo(value);
  };

  return {
    memoListState: { memoList: mainPageState.memoList },
    createNewState: { onSubmit: handleAddMemo },
  };
};

export default useMainPage;
