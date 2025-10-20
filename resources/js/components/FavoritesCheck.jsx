import React, { useEffect, useState } from "react";
import Forms from "@chappy/components/Forms";
import { apiPost } from "@chappy/utils/api";

/**
 * A component that displays a button to add a location to the favorites table.
 * @property {object} weather An instance of the Weather class.
 * @property {array} favorites The favorites associated with currently logged 
 * in user.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing form that submits request to 
 * add a location to the favorites table.
 */
function FavoritesCheck({ weather, favorites }) {

    const [isFavorite, setIsFavorite] = useState(false);

    console.log("********************");
    console.log("Favorites Check");
    console.log(weather)
    console.log(favorites)
    console.log("********************");
    const isFavoriteCity = () => {
        const weatherCity = weather.city.toLowerCase();
        for(let i = 0; i < favorites?.length; i++) {
            let favCity = favorites[i].name.toLowerCase();
            if(favCity.includes(weatherCity) || weatherCity.includes(favCity)) {
                setIsFavorite(true);
                break;
            }
        }
    }

    function getCsrfToken(e) {
        return e.target.csrf_token.value
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.city.value)
        try {
            const payload = {
                name: e.target.city.value,
                latitude: e.target.latitude.value,
                longitude: e.target.longitude.value,
                csrf_token: getCsrfToken(e)
            }
            const json = await apiPost("/favorites/store", payload);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
      
    }

    useEffect(() => {
        isFavoriteCity();
    });

    return (
        <>
            {!isFavorite && (
                <form method="POST" onSubmit={handleSubmit}>
                    <Forms.CSRF />
                    <Forms.Hidden name="city" value={weather.getCityInfo()} />
                    <Forms.Hidden name="latitude" value={weather.getLatitude()} />
                    <Forms.Hidden name="longitude" value={weather.getLongitude()} />
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-sm">
                        <i className="fa fa-plus"></i>Add
                    </button>
                </form>
            )}
        </>
    );
}        
export default FavoritesCheck;