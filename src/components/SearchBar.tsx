import React, { useState, useEffect, KeyboardEvent, useRef } from 'react';
import '../components/SearchBar.css';
import cross from '../../src/asset/cross.png';
import Search from '../asset/Search.png';
import styled from 'styled-components'

const SuggestionItem = styled.div`
  padding: 5px;
`;
type SearchResult = {
  DocumentId: number;
  DocumentTitle: {
    Text: string;
  }
  DocumentExcerpt: {
    Text: string;
  }
  DocumentURI: string;
};

interface ResultsProps {
  onClear: () => void;
}

const SearchBar: React.FC<ResultsProps> = ({ onClear }) => {
  const [suggestions, setSuggestions] = useState("");
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [results, setResults] = useState<SearchResult[]>([]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

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
        const response = await fetch(`https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json?q=${query}`);
        const result = await response.json();
        setSuggestions(result.suggestions);
        console.log(suggestions);
      } catch (error) {
        console.error("error in fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };
  const handleSearch = async () => {
    try {
      const response = await fetch(`https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json?q=${query}`);
      const data = await response.json();
      if (data.length === 0) {
        alert('No results found');
      } else {
        setResults(data.ResultItems);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data. Please try again.');
    }
  };
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    return text == undefined ? " " :
      text.replace(search, (match) => `<strong>${match}</strong>`);
  }
  return (
    <div className="search-bar" data-testid="searchbar_test">
      <div className='input-group mb-3 search-heading'>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className='input'
          data-testid="input-element"
        />
        <>
          {query.length > 0 && (
            <button data-testid="crossbutton-element" className="cross-button"   >
              <img src={cross} alt="cross" onClick={handleClearClick} />
            </button>
          )}
        </>
        <button className='btn btn btn-primary' style={{ backgroundColor: "#1C76D5" }} onClick={handleSearch} data-testid="search-element" > <img data-testid="image-element" src={Search} alt="search" className='clear-button' />&nbsp;Search</button>
      </div>
      {showSuggestions && (
        <>
          {[suggestions].map((suggestion, index) => (
            <div key={index} onClick={() => handleSuggestionClick(suggestion)} className="dropdown" >
              <SuggestionItem className={selectedSuggestionIndex === 0 ? "selected" : ""} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[0], query) }}></SuggestionItem>
              <SuggestionItem className={selectedSuggestionIndex === 1 ? "selected" : ""} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[1], query) }}></SuggestionItem>
              <SuggestionItem className={selectedSuggestionIndex === 2 ? "selected" : ""} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[2], query) }}></SuggestionItem>
              <SuggestionItem className={selectedSuggestionIndex === 3 ? "selected" : ""} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[3], query) }}></SuggestionItem>
              <SuggestionItem className={selectedSuggestionIndex === 4 ? "selected" : ""} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[4], query) }}></SuggestionItem>
              <SuggestionItem className={selectedSuggestionIndex === 5 ? "selected" : ""} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[5], query) }}></SuggestionItem>
            </div>
          ))}
        </>
      )}

      <div className='results'>
        {results.length > 0 && (
          <>
            {results.map((result, id) => (
              <div key={id}>
                <h5 className='heading-text' dangerouslySetInnerHTML={{ __html: highlightText(result.DocumentTitle.Text, query) }} />
                <p className='description-text' dangerouslySetInnerHTML={{ __html: highlightText(result.DocumentExcerpt.Text, query) }} />
                <a href={result.DocumentURI} className="link-text" dangerouslySetInnerHTML={{ __html: highlightText(result.DocumentURI, query) }} ></a>
              </div>
            ))}
          </>
        )
        }
      </div>
    </div>
  );
};

export default SearchBar;