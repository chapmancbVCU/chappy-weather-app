import React from "react";
import "@css/searchbar.css";
import Forms from "@chappy/components/Forms";
function SearchBar() {

    return (
        <div className="search-bar">
            <form>
                <Forms.CSRF />
            </form>
        </div>
    );
}        
export default SearchBar;