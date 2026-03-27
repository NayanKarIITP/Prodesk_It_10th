import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MERN Blog title', () => {
  render(<App />);
  const titleElement = screen.getByText(/MERN/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Add Author heading', () => {
  render(<App />);
  const sidebarHeading = screen.getByText(/Add Author/i);
  expect(sidebarHeading).toBeInTheDocument();
});