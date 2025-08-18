import { type ColumnDef } from '@tanstack/react-table';
import type { AddMemoFormValue } from '@/types';
import { TokenList } from '../uiKit';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AudioCell } from './AudioCell';

export const createMemoTableColumns: ({
  onEdit,
  onRemove,
}: {
  onEdit: (params: { id: string }) => void;
  onRemove: (params: { id: string }) => void;
}) => ColumnDef<AddMemoFormValue>[] = ({ onEdit, onRemove }) => [
  {
    accessorKey: 'title',
    header: 'title',
    cell: ({ row }) => {
      return (
        <Button
          variant={'link'}
          onClick={() => onEdit({ id: row.original.id })}
        >
          {' '}
          {row.original.title}
        </Button>
      );
    },
  },

  {
    accessorKey: 'tokens',
    header: 'tokens',
    cell: ({ row }) => <TokenList items={row.getValue('tokens')} />,
  },

  {
    accessorKey: 'audio',
    header: 'audio',
    cell: ({ row }) => {
      const audio = row.getValue('audio') as Blob;
      return <AudioCell audio={audio} />;
    },
  },
  { accessorKey: 'summary', header: 'summary' },
  {
    accessorKey: 'description',
    header: 'description',
    cell: ({ row }) => {
      const description = row.getValue('description');

      return (
        <div className="w-">{`${String(description).slice(0, 15)}...`}</div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit({ id: row.original.id })}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRemove({ id: row.original.id })}>
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
