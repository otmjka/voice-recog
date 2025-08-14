import { Container } from './MainPage.Parts';
import useMainPage from './useMainPage';
import type { FC } from 'react';

import MemoList from './MemoList';
import { CreateNew } from './CreateNew';

const MainPage: FC<{ onClick: () => void }> = ({ onClick }) => {
  const state = useMainPage();
  return (
    <Container>
      <CreateNew state={state.createNewState} />
      <MemoList state={state.memoListState} />
    </Container>
  );
};

export default MainPage;
