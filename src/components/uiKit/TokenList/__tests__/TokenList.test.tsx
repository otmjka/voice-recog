import { render } from '@testing-library/react';
import TokenList from '../TokenList';
import { act } from 'react';
import type { AddTokenFormValue } from '@/types';
import { checkTokens, rmToken } from './helpers/checkTokens';
const TOKENS = ['new', 'daily', 'task'];

describe('TokenList', () => {
  it(`renders list of 3 tokens 'new', 'daily', 'task'`, async () => {
    const items: AddTokenFormValue[] = TOKENS.map((token) => ({ token }));
    const renderData = render(<TokenList items={items} />);

    checkTokens({ tokens: TOKENS });
    await act(async () => renderData.rerender(<TokenList items={items} />));
  });

  it(`remove click`, async () => {
    let items: AddTokenFormValue[] = TOKENS.map((token) => ({ token }));

    const rmHandler = (filterItem: AddTokenFormValue) =>
      (items = items.filter((item) => item !== filterItem));

    const renderData = render(<TokenList items={items} onRemove={rmHandler} />);

    await rmToken({ token: TOKENS[0] });

    await act(async () =>
      renderData.rerender(<TokenList items={items} onRemove={rmHandler} />),
    );

    checkTokens({ tokens: [TOKENS[1], TOKENS[2]] });
  });
});
