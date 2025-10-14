import React from "react";
import documentTitle from "@chappy/utils/documentTitle";
import "@css/forecast.css";
import FavoritesCard from "@/components/FavoritesCard";

function ManageFavorites({ favorites }) {
    documentTitle('Your Favorites');
    return (
        <div className="d-flex flex-column w-75 mx-auto">
            <h1 className="text-center">Your Favorites</h1>
            <div className="manage-favorites-content">
                {favorites && favorites.map((favorite, index) => (
                   <FavoritesCard favorite={favorite} key={index} /> 
                ))}
            </div>
        </div>
    );
}        
export default ManageFavorites;