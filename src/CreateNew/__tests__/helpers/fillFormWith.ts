import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChangeFromTestId } from '@/enums/dataTestId';
import { addToken } from '@/components/uiKit/TokensForm/__tests__/helpers/addToken';

export const fillFormWith = async (params: {
  title: string;
  tokens: string[];
  summary: string;
  description: string;
}) => {
  /* title */
  const input = screen.getByTestId(ChangeFromTestId.titleInput);
  await userEvent.clear(input);
  await userEvent.type(input, params.title);

  expect(input).toHaveValue(params.title);

  /* tokens */
  /* add token */

  // src/CreateNew/TokensForm/__tests__/TokensForm.test.tsx
  await addToken(params.tokens[0]);
  await addToken(params.tokens[1]);
  await addToken(params.tokens[2]);

  /* summary */

  const inputSummary = screen.getByTestId(ChangeFromTestId.summaryInput);
  await userEvent.clear(inputSummary);
  await userEvent.type(inputSummary, params.summary);

  expect(inputSummary).toHaveValue(params.summary);

  /* description */

  const inputDescription = screen.getByTestId(
    ChangeFromTestId.inputDescription,
  );
  await userEvent.clear(inputDescription);
  await userEvent.type(inputDescription, params.description);

  expect(inputDescription).toHaveValue(params.description);
};
