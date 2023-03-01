import { render, screen } from '@testing-library/react';
import App from './App';

// Example test in React. This one doesn't test behavior,
// but I've often written testing-library/react tests that do.
// I've also worked with enzyme (another often-used testing library).
test('renders a header, body and footer', () => {
  render(<App />);
  const headerText = screen.getByText(/Burger: 100/i);
  const bodyText = screen.getByText(/Location/i);
  const footerText = screen.getByText(/Attribution/i);
  expect(headerText).toBeInTheDocument();
  expect(bodyText).toBeInTheDocument();
  expect(footerText).toBeInTheDocument();
});
