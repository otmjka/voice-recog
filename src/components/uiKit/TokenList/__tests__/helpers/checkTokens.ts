import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type Prefix = {
  prefix?: string;
};

export const checkToken = ({
  token,
  prefix = 'token-badge-',
}: { token: string } & Prefix) => {
  const tokenBadge = screen.getByTestId(`${prefix}${token}`);
  expect(tokenBadge).toBeInTheDocument();
  expect(tokenBadge).toHaveTextContent(token);
};

export const checkTokens = ({
  tokens,
  prefix = 'token-badge-',
}: { tokens: string[] } & Prefix) =>
  tokens.map((token) => checkToken({ token, prefix }));

export const rmToken = async ({
  token,
  prefix = 'token-badge-',
}: { token: string } & Prefix) => {
  const tokenBadge = screen.getByTestId(`${prefix}${token}-rm`);
  await userEvent.click(tokenBadge);
};
