import React, { useState } from "react";
import "@css/searchbar.css";
import { apiGet, useAsync } from '@chappy/utils/api';
function SearchBar({searchTerm, onSubmit}) {
    const [q, setQ] = useState("");

    const onInputChange = (e) => {
        setQ(e.target.value);
    }
    
   const { data: options = [], loading, error } = useAsync(({ signal }) => {
        if (!q) return Promise.resolve([]);
        return apiGet('/weather/search', { query: { q }, signal})
    }, [q]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(q);
    }

    console.log(q)
    return (
        <>
            <div className="search-bar">
                <form className="search-form" onSubmit={handleSubmit}>
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
                    <button className='search-button' onClick={onSubmit}>Search</button>
                </form>
            </div>
            <ul className="options-list">

            </ul>
        </>
    );
}        
export default SearchBar;