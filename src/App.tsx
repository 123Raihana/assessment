import React from 'react';
import SearchBar from './components/SearchBar';
import Suggestions from './components/Suggestions';


const App: React.FC = () => {
  const handleClearSearch = () => {
    console.log('Search bar cleared');
  }
  return (
    <div>
      <h1>Task 1</h1>
      <SearchBar />
      <h1>Task 2</h1>
      <Suggestions dropdown={["child"]} onClear={handleClearSearch} />
    </div>
  );
};

export default App;
