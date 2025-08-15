import type { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { AddTokenFormValue, TokenListItems } from '@/types';

const TokenList: FC<{
  items: TokenListItems;
  onRemove?: (item: AddTokenFormValue) => void;
}> = ({ items, onRemove }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {items.map((item, id) => (
      <Badge
        key={item.token + String(id)}
        variant="secondary"
        className="flex items-center gap-1"
      >
        <div className="flex items-center">
          <div>{item.token}</div>

          {onRemove && (
            <div>
              <Button
                type="button"
                onClick={() => onRemove(item)}
                className="bg-pink-800 ml-1 px-2 text-xs text-white hover:text-red-700 size-[14px]"
              >
                <span>×</span>
              </Button>
            </div>
          )}
        </div>
      </Badge>
    ))}
  </div>
);

export default TokenList;
