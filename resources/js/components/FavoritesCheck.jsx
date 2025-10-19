import React, { useEffect, useState } from "react";
import Forms from "@chappy/components/Forms";
import route from "@chappy/utils/route";
import { apiPost } from "@chappy/utils/api";
import { getCsrf } from "@chappy/utils/csrf";
function FavoritesCheck({ weather, favorites }) {

    const [isFavorite, setIsFavorite] = useState(false);

    const [form, setForm] = useState({
        
    });

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

    function getCsrfToken(e) {
        return e.target.csrf_token.value
    }
    async function handleSubmit(e) {
        //console.log(e.target.csrf_token.value)
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