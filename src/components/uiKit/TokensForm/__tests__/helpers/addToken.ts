import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChangeFromTestId } from '@/enums/dataTestId';

export const addToken = async (tokenValue: string) => {
  const inputTokens = screen.getByTestId(ChangeFromTestId.addTokenInput);
  await userEvent.clear(inputTokens);
  await userEvent.type(inputTokens, tokenValue);

  expect(inputTokens).toHaveValue(tokenValue);

  const tokensSubmitBtn = screen.getByTestId(ChangeFromTestId.addTokenSubmit);
  await userEvent.click(tokensSubmitBtn);
};
