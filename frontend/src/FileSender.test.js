import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileSender from './FileSender';

describe('FileSender', () => {
  test('renders file upload button', () => {
    render(<FileSender />);
    const uploadButton = screen.getByLabelText(/upload do arquivo/i);
    expect(uploadButton).toBeInTheDocument();
  });

  test('displays selected file name after file selection', async () => {
    render(<FileSender />);
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByLabelText(/upload do arquivo/i);

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      const selectedFileName = screen.getByText(/arquivo selecionado:/i);
      expect(selectedFileName).toHaveTextContent('test.txt');
    });
  });

});
