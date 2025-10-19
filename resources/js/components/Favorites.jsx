import React from "react";
import FavoritesCard from "./FavoritesCard";
import "@css/forecast.css";

/**
 * Renders a component containing favorites in a scrollable container.
 * @property {array} favorites The favorites associated with currently logged 
 * in user.
 * @property {string} units The system of units in use.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The container with favorites.
 */
function Favorites({ favorites, units }) {
    return (
        <div className="favorites-bar mx-auto my-3">
            <h5 className="text-center my-2">Favorite Locations</h5>
            <div className="favorite-cards-container">
                {favorites && favorites.map((favorite, index) => (
                    <FavoritesCard favorite={favorite} key={index} units={units}/> 
                ))}
            </div>
        </div>
    );
}        
export default Favorites;