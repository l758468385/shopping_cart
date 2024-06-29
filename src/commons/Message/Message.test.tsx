import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MessageContainer } from './Message';
import $message from "./Message"
jest.useFakeTimers();

describe('MessageContainer', () => {
  beforeEach(() => {
    render(<MessageContainer />);
  });

  test('should render the MessageContainer component', () => {
    const container = document.querySelector('.message-wrap');
    expect(container).toBeInTheDocument();
  });

  test('should display a success message', async () => {
    act(() => {
      $message.success('Success message');
    });

    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  test('should display a warning message', async () => {
    act(() => {
      $message.warning('Warning message');
    });

    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  test('should display an error message', async () => {
    act(() => {
      $message.error('Error message');
    });

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('should display an info message', async () => {
    act(() => {
      $message.info('Info message');
    });

    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  test('should remove message after timeout', async () => {
    act(() => {
      $message.info('Temporary message');
    });

    expect(screen.getByText('Temporary message')).toBeInTheDocument();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByText('Temporary message')).not.toBeInTheDocument();
    });
  });
});
