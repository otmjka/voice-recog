import type { FC } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CreateNew } from '@/components/CreateNew';
import type { CreateNewState } from './types';

export const EditMemoDialog: FC<{
  state: CreateNewState;
}> = ({ state: { formState, editMemoDialogOpened, openEditMemoDialog } }) => {
  return (
    <Dialog open={editMemoDialogOpened} onOpenChange={openEditMemoDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{formState.value ? 'Edit' : 'New'} memo</DialogTitle>
          <DialogDescription>Descriptions</DialogDescription>
        </DialogHeader>
        <CreateNew value={formState.value} onSubmit={formState.onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
