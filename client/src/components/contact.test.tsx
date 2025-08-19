import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Contact from './contact';
import { vi } from 'vitest';

vi.mock('@/lib/queryClient', () => ({
  apiRequest: vi.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }))
}));

function renderComponent() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <Contact />
    </QueryClientProvider>
  );
}

test('submits contact form', async () => {
  const user = userEvent.setup();
  renderComponent();

  await user.type(screen.getByTestId('input-contact-name'), 'Jane');
  await user.type(screen.getByTestId('input-contact-email'), 'jane@example.com');
  await user.type(screen.getByTestId('textarea-contact-message'), 'Hello from space!');
  await user.click(screen.getByTestId('button-send-message'));

  const { apiRequest } = await import('@/lib/queryClient');
  expect(apiRequest).toHaveBeenCalledWith(
    'POST',
    '/api/contact',
    expect.objectContaining({ name: 'Jane' })
  );
});
