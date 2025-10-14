import React from "react";
function FavoritesCard({ favorite }) {

    return (
        <div className="manage-favorites-card">
            <h5 className="my-2">{favorite.name}</h5>
        </div>
    );
}        
export default FavoritesCard;