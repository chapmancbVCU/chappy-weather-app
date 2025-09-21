import React, { useState } from "react";
import "@css/searchbar.css";
import { apiGet, useAsync } from '@chappy/utils/api';

/**
 * Supports the search feature for the weather application.  It also includes, 
 * the ability to show suggestions when user types input.
 * 
 * @property {} onSubmit 
 * @param {InputProps} param0 
 * @returns {JSX.Element} The search bar
 */
function SearchBar({ onSubmit }) {
    /**
     * Search text entered by the user.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [searchTerm, setSearchTerm] = useState("");
    const [q, setQ] = useState("");

    const onOptionSelect = (option) => {
        let term = option.name + ", " + option.state + ", " + option.country;
        setSearchTerm(term)
    }
    const onInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value)
        setQ(value);
    }

   const { data: options = [], loading, error } = useAsync(({ signal }) => {
        if (!q) return Promise.resolve([]);
        return apiGet('/weather/search', { query: { q }, signal})
    }, [q]);

    const handleClick = (e) => {
        e.preventDefault();
        onSubmit?.(searchTerm);
    }

    const geoData = options?.data;

    return (
        <>
            <div className="search-bar">
                <form className="search-form">
                    <input id="q"
                        className="search-input"
                        type="text"
                        aria-label="Get weather conditions"
                        placeholder="City or Zip Code"
                        value={searchTerm}
                        onChange={onInputChange}>
                    </input>
                    <div
                        id="search-spinner"
                        aria-hidden
                        hidden={true}
                    />
                    <div className="sr-only" aria-live="polite"></div>
                    <button className='search-button' onClick={handleClick}>Search</button>
                </form>
            </div>
            <ul className="options-list">
                {geoData && geoData.map((option, index) => (
                    <li className="option-list-item" key={option.name + '-' + index}>
                        <button onClick={() => onOptionSelect(option)}>
                            {option.name}, {option.state}, {option.country}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}        
export default SearchBar;