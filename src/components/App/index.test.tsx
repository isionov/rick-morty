import React from 'react';
import { render } from '@testing-library/react';
import { App } from './index';
import '../../setupTests';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Party/i);
  expect(title).toBeInTheDocument();
});
