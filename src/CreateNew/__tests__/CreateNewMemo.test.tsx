import { render } from '@testing-library/react';
import CreateNew from '../CreateNew';

import { vi } from 'vitest';
import { fillFormWith } from './helpers/fillFormWith';
import { clickSubmitNewMemoForm } from './helpers/clickSubmitNewMemoForm';

describe('create new memo form', () => {
  it('render form', async () => {
    const handleSubmit = vi.fn();
    render(<CreateNew state={{ onSubmit: handleSubmit }} />);
    const TOKENS = ['new', 'daily', 'task'];
    const TITLE_INPUT = 'new memo 001';
    await fillFormWith({
      title: TITLE_INPUT,
      tokens: TOKENS,
      summary: 'daily note about training process',
      description:
        'daily note a couple word about training process changes to improove the flow',
    });

    await clickSubmitNewMemoForm();
    expect(handleSubmit).toHaveBeenLastCalledWith(
      expect.objectContaining({
        description:
          'daily note a couple word about training process changes to improove the flow',
        id: '«r0»',
        records: [],
        summary: 'daily note about training process',
        title: 'new memo 001',
        tokens: [{ token: 'task' }, { token: 'daily' }, { token: 'new' }],
      }),
      expect.anything(),
    );
  });
});
