import React from 'react';
import { render } from '@testing-library/react';
import Suggestion from '../Suggestion';
 
test('renders list of items', () => {
  const mockItems = [
  'child care','child health'
  ];
 
  const { getByText } = render(<Suggestion suggestions={mockItems} clickfunction={function (suggestion: string): void {
      throw new Error('Function not implemented.');
  } } selected={0} query={''} />);
 
  mockItems.forEach(item => {
expect(getByText(item)).toBeInTheDocument();
  });
});