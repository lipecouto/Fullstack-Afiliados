import React from 'react';
import { render, screen } from '@testing-library/react';
import DataViewer from './DataViewer';

describe('DataViewer', () => {
  test('renders table headers', () => {
    render(<DataViewer />);
    const productNameHeader = screen.getByText(/product name/i);
    const sellValueHeader = screen.getByText(/sell value/i);
    expect(productNameHeader).toBeInTheDocument();
    expect(sellValueHeader).toBeInTheDocument();
  });

  test('displays data rows correctly', () => {
    const responseData = [
      {
        product: 'Product 1',
        sellers: [
          { seller: 'Seller 1', total: 100 },
          { seller: 'Seller 2', total: 200 },
        ],
        total: 300,
      },
      {
        product: 'Product 2',
        sellers: [
          { seller: 'Seller 3', total: 150 },
          { seller: 'Seller 4', total: 250 },
        ],
        total: 400,
      },
    ];

    render(<DataViewer />, { initialState: { responseData } });

    const product1Row = screen.getByText(/product 1/i);
    const product2Row = screen.getByText(/product 2/i);

    expect(product1Row).toBeInTheDocument();
    expect(product2Row).toBeInTheDocument();
  });

});
