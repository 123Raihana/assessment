import React from 'react';
import SearchBar from './components/searchbar/SearchBar';


const App: React.FC = () => {
  const handleClearSearch = () => {
    console.log('Search bar cleared');
  }
  return (
    <div data-testid='main_page'>
      <SearchBar  onClear={handleClearSearch} />
    </div>
  );
};

export default App;
