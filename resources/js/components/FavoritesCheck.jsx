import React, { useEffect, useState } from "react";
function FavoritesCheck({ weather, favorites }) {

    const [isFavorite, setIsFavorite] = useState(false);
    console.log("********************");
    console.log("Favorites Check");
    console.log(weather)
    console.log(favorites)
    console.log("********************");
    const isFavoriteCity = () => {
        const weatherCity = weather.city.toLowerCase();
        for(let i = 0; i < favorites.length; i++) {
            let favCity = favorites[i].name.toLowerCase();
            if(favCity.includes(weatherCity) || weatherCity.includes(favCity)) {
                setIsFavorite(true);
                break;
            }
        }
    }

    useEffect(() => {

        isFavoriteCity();
    })
    return (
        <>
            {isFavorite ? <p>Is favorite</p> : <p>Not favorite</p>}
        </>
    );
}        
export default FavoritesCheck;