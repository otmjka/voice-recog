import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainPage } from '../MainPage';

import { vi } from 'vitest';

describe('dummy test', async () => {
  it('should just run', () => {
    const { debug } = render(<MainPage onClick={() => {}} />);
    console.log(debug());
    expect(screen.getByText('count is')).toBeInTheDocument();
  });

  it('', async () => {
    const handleClick = vi.fn();

    render(<MainPage onClick={handleClick} />);
    await userEvent.click(screen.getByText('count is'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
