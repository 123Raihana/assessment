import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar'

describe('Search Component', () => {

  beforeEach(() => {
    render(<SearchBar onClear={function (): void {
      throw new Error('Function not implemented.');
    }} />);


  })
  test('renders Search Component in the application', () => {
    const exampleComponentElement = screen.getByTestId('searchbar_test');
    expect(exampleComponentElement).toBeInTheDocument();
  });
  test('updates input value on change', () => {
    const inputElement = screen.getByTestId('input-element') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'child' } });

    expect(inputElement.value).toBe('child');
  });
  test('triggers handleKeyDown function on up arrow press', () => {
    const inputElement = screen.getByTestId('input-element') as HTMLInputElement;
    fireEvent.keyDown(inputElement, { key: 'ArrowUp' });
    expect(inputElement.value).toBe('');
  })
  test('renders the cross image', () => {
    const imageElement = screen.getByRole('button');
    expect(imageElement).toBeInTheDocument();
  })
  test('renders the image', () => {
    const imageElement = screen.getByTestId('image-element') as HTMLInputElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'Search.png');
    expect(imageElement).toHaveAttribute('alt', 'search');
  })
  test('search button element clicked', () => {
    const searchElement = screen.getByTestId('search-element') as HTMLInputElement;
    expect(searchElement).toBeInTheDocument();
    fireEvent.click(searchElement);
  })
})


