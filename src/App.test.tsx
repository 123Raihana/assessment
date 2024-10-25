import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders App Component in the application', () => {
    render(<App />);
    
    const exampleComponentElement = screen.getByTestId('main_page');
    
    expect(exampleComponentElement).toBeInTheDocument();
  });
});