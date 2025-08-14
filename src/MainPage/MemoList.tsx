import type { FC } from 'react';
import MemoItem from './MemoItem';
import type { MemoListState } from '../types';

const MemoList: FC<{ state: MemoListState }> = ({ state }) => {
  const { memoList } = state;
  return (
    <>
      {memoList.map((item) => (
        <MemoItem key={item.id} memoItem={item} />
      ))}
    </>
  );
};

export default MemoList;
