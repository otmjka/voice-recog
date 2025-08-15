import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import 'fake-indexeddb/auto';
import MainPage from '../MainPage';
import { LocalDbService } from '@/services/LocalDbService';
import { getEmptyMemo } from '@/lib/getEmptyMemo';
import type { MemoRecord } from '@/types';
import { LanguageProvider } from '@/context/LanguageContext';

describe('MainPage tests', () => {
  it('render MainPage', async () => {
    const dbService = new LocalDbService();
    const memo: MemoRecord = { ...getEmptyMemo(), title: 'proba###' };

    await dbService.addMemo(memo);

    render(
      <LanguageProvider>
        <MainPage />
      </LanguageProvider>,
    );

    expect(screen.getByTestId('memo-table-no-results')).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('memo-table-no-results'),
    );

    expect(screen.getByTestId(`memo-table-row-${memo.id}`)).toBeInTheDocument();
  });
});
