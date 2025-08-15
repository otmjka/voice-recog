import { type FC } from 'react';

import { Button } from '@/components/ui/button';

import { VoiceRecorder } from '../VoiceRecorder';
import { EditMemoDialog } from './EditMemoDialog';
import MemoList from './MemoList';
import { Container } from './MainPage.Parts';
import useMainPage from './useMainPage';
import { LanguageSwitcher } from '../LanguageSwitcher';

const MainPage: FC = () => {
  const state = useMainPage();

  return (
    <Container>
      <div className="absolute top-4 right-4 z-100">
        <VoiceRecorder onResult={state.onRecorderResult} />
      </div>
      <div className="flex mx-2 py-1 gap-2">
        <Button
          variant="outline"
          onClick={() => state.createNewState.openEditMemoDialog(true)}
        >
          New Memo
        </Button>
        <LanguageSwitcher />
      </div>

      <EditMemoDialog state={state.createNewState} />

      <MemoList state={state.memoListState} />
    </Container>
  );
};

export default MainPage;
