import useMainPageState from './useMainPageState';
import { type UseMemoPageReturn } from './types';
import type { AddMemoHandler, OnRecordResultHandler } from '@/types';

import { localDbService } from '@/services/LocalDbService';

import { useCallback, useEffect } from 'react';
import { recordResultsToVoiceMemo } from '@/lib/recordResultsToVoiceMemo';

const useMainPage = (): UseMemoPageReturn => {
  const { mainPageState, updateState, editMemo, openEditMemoDialog } =
    useMainPageState();

  const fetchMemos = useCallback(async () => {
    try {
      const memos = await localDbService.getMemosPromise();
      if (memos.result) {
        updateState({ memoList: memos.result });
      }
    } catch (error) {
      console.error(error);
    }
  }, [updateState]);

  // init
  useEffect(() => {
    fetchMemos();
  }, [fetchMemos]);

  const handleAddMemo: AddMemoHandler = useCallback(
    async (value) => {
      await localDbService.addMemo(value);
      fetchMemos();
      openEditMemoDialog(false);
    },
    [fetchMemos, openEditMemoDialog],
  );

  const handleRecorderResult: OnRecordResultHandler = useCallback(
    (recResults) => {
      handleAddMemo(recordResultsToVoiceMemo(recResults));
    },
    [handleAddMemo],
  );

  const handleRemoveMemo = useCallback(
    async ({ id }: { id: string }) => {
      await localDbService.deleteMemo(id);
      fetchMemos();
    },
    [fetchMemos],
  );

  const result = {
    onRecorderResult: handleRecorderResult,
    memoListState: {
      memoList: mainPageState.memoList,
      onEdit: editMemo,
      onRemove: handleRemoveMemo,
    },
    createNewState: {
      editMemoDialogOpened: mainPageState.editMemoDialogOpened,
      openEditMemoDialog,
      formState: { value: mainPageState.editValue, onSubmit: handleAddMemo },
    },
  };
  return result;
};

export default useMainPage;
