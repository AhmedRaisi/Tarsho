import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders react app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Empowering Your Independence, Enriching Your Choices/i);
  expect(linkElement).toBeInTheDocument();
});
