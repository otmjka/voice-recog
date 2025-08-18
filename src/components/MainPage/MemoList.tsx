import { useMemo, type FC } from 'react';
import type { MemoListState } from '../../types';
import { createMemoTableColumns, MemoTable } from '@/components/MemoTable';

const MemoList: FC<{ state: MemoListState }> = ({ state }) => {
  const { memoList } = state;

  const memoTableColumns = useMemo(
    () =>
      createMemoTableColumns({
        onEdit: state.onEdit,
        onRemove: state.onRemove,
      }),
    [state.onEdit, state.onRemove],
  );

  return (
    <div className="flex mx-2 py-1">
      <MemoTable
        data={memoList}
        columns={memoTableColumns}
        onRowClick={(id) => state.onEdit({ id })}
      />
    </div>
  );
};

export default MemoList;
