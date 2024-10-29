import React from "react";
import styled from 'styled-components'
import '../dropdown/Suggestion.css';

const SuggestionItem = styled.div`
  padding: 5px;
`;
const DivSuggestion = styled.div`
position: absolute;
background-color: #fff;
box-shadow: 0px 4px 8px 4px #e0e4e559;
top: 97px !important;
left: 57px;
width: 81%;

@media screen and (max-width: 480px) {
    width: 50%;
}
@media screen and (min-width: 768px) and (max-width:1024px){
    width: 75%;
}
@media screen and (min-width :1024px) and (max-width:1440px){
    width:81%;
}
`;



interface SuggestionProps {
    suggestions: string;
    clickfunction: (suggestion: string) => void;
    selected: number;
    query: string;
}

const Suggestion: React.FC<SuggestionProps> = ({ suggestions, clickfunction, selected, query }) => {
    const highlightText = (text: string, search: string) => {
        return text === undefined ? " " :
            text.replace(search, (match) => `<strong>${match}</strong>`);
    }
    return (
        <>
            {[suggestions].map((suggestion, index) => (
                <DivSuggestion key={index}>
                    <SuggestionItem className={selected === 0 ? "selected" : "hovered"} onClick={() => clickfunction(suggestion[0])} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[0], query) }}></SuggestionItem>
                    <SuggestionItem className={selected === 1 ? "selected" : "hovered"} onClick={() => clickfunction(suggestion[1])} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[1], query) }}></SuggestionItem>
                    <SuggestionItem className={selected === 2 ? "selected" : "hovered"} onClick={() => clickfunction(suggestion[2])} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[2], query) }}></SuggestionItem>
                    <SuggestionItem className={selected === 3 ? "selected" : "hovered"} onClick={() => clickfunction(suggestion[3])} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[3], query) }}></SuggestionItem>
                    <SuggestionItem className={selected === 4 ? "selected" : "hovered"} onClick={() => clickfunction(suggestion[4])} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[4], query) }}></SuggestionItem>
                    <SuggestionItem className={selected === 5 ? "selected" : "hovered"} onClick={() => clickfunction(suggestion[5])} dangerouslySetInnerHTML={{ __html: highlightText(suggestion[5], query) }}></SuggestionItem>
                </DivSuggestion>
            ))}

        </>
    );
}
export default Suggestion;