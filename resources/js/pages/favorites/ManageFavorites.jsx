import React from "react";
import documentTitle from "@chappy/utils/documentTitle";
import "@css/forecast.css";
function ManageFavorites({ favorites }) {
    console.log(favorites);
    documentTitle('Your Favorites');
    return (
        <div className="d-flex flex-column w-75 mx-auto">
            <h1 className="text-center">Your Favorites</h1>
            <div className="d-flex mx-auto flex-row ">
                {favorites && favorites.map((favorite, index) => (
                    <div className="favorites-card" key={index}>
                        <h5 className="my-2">{favorite.name}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
}        
export default ManageFavorites;