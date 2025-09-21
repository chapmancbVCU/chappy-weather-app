import React from "react";
import "@css/searchbar.css";

function SearchBar({searchTerm, onInputChange, onSubmit}) {

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
                    <button className='search-button' onClick={onSubmit}>Search</button>
                </form>
            </div>
        </>
    );
}        
export default SearchBar;