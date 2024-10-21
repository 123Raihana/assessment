import React, { useState } from 'react';

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

const SearchResults: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json?q=${searchTerm}`);
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
        const regex = new RegExp(search, 'gi');
        return text.replace(regex, (match) => `<strong>${match}</strong>`);
    }
    return (
        <>
            <div className='input-group mb-3'>
                <input
                    type="text"
                    placeholder="Enter search keyword"
                    value={searchTerm}
                    className="form-control"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='btn btn btn-primary' onClick={handleSearch}>Search</button>
            </div>
            <div>
                {results.length > 0 && (
                    <>
                        {results.map((result, id) => (
                            <div className='card pt-1' key={id}>
                                <h5 dangerouslySetInnerHTML={{ __html: highlightText(result.DocumentTitle.Text, searchTerm) }} />
                                <p dangerouslySetInnerHTML={{ __html: highlightText(result.DocumentExcerpt.Text, searchTerm) }} />
                                <h6 dangerouslySetInnerHTML={{ __html: highlightText(result.DocumentURI, searchTerm) }} />
                            </div>
                        ))}
                    </>
                )
                }
            </div>
        </>
    );
};

export default SearchResults;