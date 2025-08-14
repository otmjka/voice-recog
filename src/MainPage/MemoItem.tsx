import type { FC } from 'react';
import type { MemoRecord } from '../types';

const MemoItem: FC<{ memoItem: MemoRecord }> = ({ memoItem }) => {
  return (
    <>
      <div>{memoItem.id}</div>
      <div>{JSON.stringify(memoItem.tokens, null, 2)}</div>
      <div></div>
    </>
  );
};

export default MemoItem;
