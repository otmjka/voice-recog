import { render } from '@testing-library/react';
import TokensForm from '../TokensForm';
import { addToken } from './helpers/addToken';
import { act } from 'react';
import type { Token } from '@/types';
const TOKENS = ['new', 'daily', 'task'];

describe('add tokens form', () => {
  it('render form, add token, render list added tokens', async () => {
    let value: Token[] = [];
    const renderData = render(
      <TokensForm value={value} onChange={(newValue) => (value = newValue)} />,
    );
    await addToken(TOKENS[0]);
    expect(value).toEqual([{ token: TOKENS[0] }]);

    await act(async () => {
      renderData.rerender(
        <TokensForm
          value={value}
          onChange={(newValue) => (value = newValue)}
        />,
      );
    });
  });
});
