import { render } from '@testing-library/react';
import CreateNew from '../CreateNew';

import { vi } from 'vitest';
import { fillFormWith } from './helpers/fillFormWith';
import { clickSubmitNewMemoForm } from './helpers/clickSubmitNewMemoForm';
import { LanguageProvider } from '@/context/LanguageContext';

describe('create new memo form', () => {
  it('render form', async () => {
    const handleSubmit = vi.fn();
    render(
      <LanguageProvider>
        <CreateNew onSubmit={handleSubmit} />
      </LanguageProvider>,
    );
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
        id: expect.any(String),
        title: 'new memo 001',
        tokens: [{ token: 'task' }, { token: 'daily' }, { token: 'new' }],
        speach: null,
        audio: null,
      }),
      expect.anything(),
    );
  });
});
