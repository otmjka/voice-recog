import type { FC } from 'react';
import MemoItem from './MemoItem';
import type { MemoListState } from '../types';

const MemoList: FC<{ state: MemoListState }> = ({ state }) => {
  const { memoList } = state;
  return (
    <div className="w-[800px] bg-green-400 p-1">
      {memoList.map((item) => (
        <MemoItem key={item.id} memoItem={item} />
      ))}
    </div>
  );
};

export default MemoList;
