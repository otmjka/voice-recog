import { Container } from './MainPage.Parts';
import useMainPage from './useMainPage';
import type { FC } from 'react';

import MemoList from './MemoList';
import { CreateNew } from '../CreateNew';

const MainPage: FC<{ onClick?: () => void }> = ({ onClick }) => {
  const state = useMainPage();
  return (
    <Container>
      <div className="w-[500px] p-4 bg-green-100">
        <CreateNew state={state.createNewState} />
      </div>
      <MemoList state={state.memoListState} />
    </Container>
  );
};

export default MainPage;
