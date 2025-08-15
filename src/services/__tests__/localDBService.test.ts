// localDbService.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import 'fake-indexeddb/auto'; // подменяет глобальный indexedDB
import { LocalDbService } from '../LocalDbService';
import type { MemoRecord } from '@/types';
import { getEmptyMemo } from '@/lib/getEmptyMemo';

describe('LocalDbService', () => {
  let dbService: LocalDbService;

  beforeEach(() => {
    dbService = new LocalDbService();
  });

  it('empty memo list', async () => {
    const fetched = await dbService.getMemosPromise();
    expect(fetched).toEqual({ result: [] });
  });

  it('add new memo', async () => {
    const memo: MemoRecord = getEmptyMemo();

    await dbService.addMemo(memo);
    const fetched = await dbService.getMemosPromise();

    expect(fetched.result).toEqual([memo]);
  });

  it.skip('remove memo', async () => {
    const memo: MemoRecord = getEmptyMemo();

    await dbService.addMemo(memo);
    await new Promise((r) => setTimeout(r, 0)); // hacks fake-indexDB
    const result = await dbService.deleteMemo(memo.id);
    expect(result).toEqual({ result: true });

    await new Promise((r) => setTimeout(r, 0)); // hacks fake-indexDB

    const fetched = await dbService.getMemosPromise();

    expect(fetched).toEqual({ result: [] });
  });
});
