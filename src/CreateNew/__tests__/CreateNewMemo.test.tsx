import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateNew from '../CreateNew';

import { vi } from 'vitest';
import { ChangeFromTestId } from '../enums';
import { act } from 'react';
import { addToken } from '../TokensForm/__tests__/helpers/addToken';

describe('create new memo form', () => {
  it('render form', async () => {
    const handleSubmit = vi.fn();
    const renderData = render(<CreateNew state={{ onSubmit: handleSubmit }} />);

    /* title */
    const TITLE_INPUT = 'new memo 001';
    const input = screen.getByTestId(ChangeFromTestId.titleInput);
    await userEvent.clear(input);
    await userEvent.type(input, TITLE_INPUT);

    expect(input).toHaveValue(TITLE_INPUT);

    /* tokens */
    /* add token */
    const TOKENS = ['new', 'daily', 'task'];
    // src/CreateNew/TokensForm/__tests__/TokensForm.test.tsx
    await addToken(TOKENS[0]);

    // const inputTokens = screen.getByTestId(ChangeFromTestId.addTokenInput);
    // await userEvent.clear(inputTokens);
    // await userEvent.type(inputTokens, TOKENS[0]);

    // expect(inputTokens).toHaveValue(TOKENS[0]);

    // const tokensSubmitBtn = screen.getByTestId(ChangeFromTestId.addTokenSubmit);
    // await userEvent.click(tokensSubmitBtn);

    await act(async () => {
      renderData.rerender(<CreateNew state={{ onSubmit: handleSubmit }} />);
    });
  });
});
