import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Reservation from './reservation';
import { vi } from 'vitest';

vi.mock('@/lib/queryClient', () => ({
  apiRequest: vi.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }))
}));

function renderComponent() {
  const queryClient = new QueryClient();
  const facility = {
    id: 'fac-1',
    name: 'Quantum Bowling',
    type: 'bowling',
    description: '',
    capacity: 8,
    hourlyRate: '45.00'
  };
  queryClient.setQueryData(['/api/facilities'], [facility]);
  queryClient.setQueryData(['/api/availability', facility.id, '2099-01-01'], [
    { time: '10:00', available: true, displayTime: '10:00 AM' }
  ]);
  return {
    facility,
    ...render(
      <QueryClientProvider client={queryClient}>
        <Reservation />
      </QueryClientProvider>
    )
  };
}

it('submits reservation form', async () => {
  const user = userEvent.setup();
  const { facility } = renderComponent();

  await user.click(screen.getByTestId(`facility-button-${facility.type}`));
  await user.type(screen.getByTestId('input-date'), '2099-01-01');
  await user.click(screen.getByTestId('select-time'));
  await user.click(screen.getByTestId('time-slot-10:00'));
  await user.clear(screen.getByTestId('input-party-size'));
  await user.type(screen.getByTestId('input-party-size'), '2');
  await user.type(screen.getByTestId('input-phone'), '1234567890');
  await user.type(screen.getByTestId('input-name'), 'John Doe');
  await user.type(screen.getByTestId('input-email'), 'john@example.com');
  await user.click(screen.getByTestId('button-submit-reservation'));

  const { apiRequest } = await import('@/lib/queryClient');
  expect(apiRequest).toHaveBeenCalledWith(
    'POST',
    '/api/reservations',
    expect.objectContaining({ customerName: 'John Doe' })
  );
});
