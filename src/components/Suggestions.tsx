import React, { useState, useEffect, KeyboardEvent, useRef } from 'react';
import '../index.css';
import cross from '../../src/asset/cross.png';

interface ResultsProps {
  onClear: () => void;
  dropdown: string[];
}

const Suggestions: React.FC<ResultsProps> = ({ dropdown, onClear }) => {
  const [suggestions, setSuggestions] = useState("");
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  console.log(selectedSuggestionIndex)
  const handleClearClick = () => {
    setQuery('');
    setShowSuggestions(false)
    onClear();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' && selectedSuggestionIndex > -1) {
      setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
    } else if (e.key === 'ArrowDown' && selectedSuggestionIndex < suggestions.length - 1) {
      setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
    } else if (e.key === 'Enter' && selectedSuggestionIndex !== -1) {
      setQuery(suggestions[selectedSuggestionIndex]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json?q=${dropdown}`);
        const result = await response.json();
        setSuggestions(result.suggestions);
        console.log(suggestions);
      } catch (error) {
        console.error("error in fetching data:", error);
      }
    };
    fetchData();
  }, [suggestions, dropdown]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className='form-control'
      />
      {query.length > 0 && (
        <img src={cross} alt="cross" onClick={handleClearClick} className="clear-button" />
      )}
      {showSuggestions && (
        <>
          {[suggestions].map((suggestion, index) => (
            <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
              <div className={selectedSuggestionIndex === 0 ? "selected" : ""}>{suggestion[0]}</div>
              <div className={selectedSuggestionIndex === 1 ? "selected" : ""}>{suggestion[1]}</div>
              <div className={selectedSuggestionIndex === 2 ? "selected" : ""}>{suggestion[2]}</div>
              <div className={selectedSuggestionIndex === 3 ? "selected" : ""}>{suggestion[3]}</div>
              <div className={selectedSuggestionIndex === 4 ? "selected" : ""}>{suggestion[4]}</div>
              <div className={selectedSuggestionIndex === 5 ? "selected" : ""}>{suggestion[5]}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Suggestions;