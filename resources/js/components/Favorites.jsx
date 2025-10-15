import React from "react";
import FavoritesCard from "./FavoritesCard";
import "@css/forecast.css";
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