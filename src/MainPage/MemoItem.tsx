import type { FC } from 'react';
import type { MemoRecord } from '../types';

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronRightIcon, Mic, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TokenList } from '@/components/uiKit';

const MemoItem: FC<{ memoItem: MemoRecord }> = ({ memoItem }) => {
  return (
    <Card className="bg-red-100 p-1">
      <CardHeader>
        <CardTitle>{memoItem.title}</CardTitle>
        <CardDescription>
          <TokenList items={memoItem.tokens} />
          {memoItem.summary}
        </CardDescription>
        <CardAction>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" className="size-8">
              <ChevronRightIcon />
            </Button>
            <Button variant="secondary" size="icon" className="size-8">
              <Trash />
            </Button>
            <Button variant="secondary" size="icon" className="size-8">
              <Mic />
            </Button>
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default MemoItem;
