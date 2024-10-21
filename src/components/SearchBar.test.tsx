import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('searches and displays results correctly', async () => {

  const mockData = {
    results: ['Result 1', 'Result 2'],
  };

  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  const { getByPlaceholderText, getByText } = render(<SearchBar />);

  const inputElement = getByPlaceholderText('Enter search keyword');
  const searchButton = getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'searchTerm' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json?q=searchTerm');
  });
});