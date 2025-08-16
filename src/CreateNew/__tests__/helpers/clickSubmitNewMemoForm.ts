import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChangeFromTestId } from '@/enums/dataTestId';

export const clickSubmitNewMemoForm = async () => {
  const btn = screen.getByTestId(ChangeFromTestId.submitMemo);
  await userEvent.click(btn);
};
