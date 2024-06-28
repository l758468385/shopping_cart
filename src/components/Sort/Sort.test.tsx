import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Sort from './Sort';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setSortDirection } from '../../store/slices/productsSlice';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Sort component', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector: (state: RootState) => any) =>
      selector({
        products: {
          items: [],
          filterSizes: [],
          sortDirection: null, // mock initial state as needed
          status: 'idle', // mock product status as needed
        },
      } as RootState)
    );
  });

  it('renders with initial state', () => {
    const { getByText } = render(<Sort />);
    expect(getByText('按价格升序')).toBeInTheDocument();
    expect(getByText('按价格降序')).toBeInTheDocument();
    expect(useDispatch).toBeCalledTimes(1); // ensure useDispatch is called
  });

  it('handles sorting correctly', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { getByText } = render(<Sort />);
    fireEvent.click(getByText('按价格升序'));

    expect(mockDispatch).toBeCalledWith(setSortDirection('ascending'));

    fireEvent.click(getByText('按价格降序'));

    expect(mockDispatch).toBeCalledWith(setSortDirection('descending'));
  });
});
