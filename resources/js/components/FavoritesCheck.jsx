import React, { useEffect, useState } from "react";
import Forms from "@chappy/components/Forms";
import { apiPost, apiError } from "@chappy/utils/api";

/**
 * A component that displays a button to add a location to the favorites table.
 * 
 * @property {object} weather An instance of the Weather class.
 * @property {array} favorites The favorites associated with currently logged 
 * in user.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing form that submits request to 
 * add a location to the favorites table.
 */
function FavoritesCheck({ weather, favorites }) {
    /**
     * Sets value of error if exists.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [error, setError] = useState(null);

    /**
     * State to track if current location is a favorite city.
     * @type {[boolean, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [isFavorite, setIsFavorite] = useState(false);

    /**
     * Determines if a city is a favorite location.  If so we do not render 
     * form for adding city as favorite.
     */
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

    /**
     * Sends post request to favorites controller when the 
     * form is submitted.
     * @param {Event} e Event for when user submits a form.
     */
    async function handleSubmit(e) {
        const storedWeather = weather.readStorage();
        e.preventDefault();
        try {
            const payload = {
                name: storedWeather.location,
                latitude: e.target.latitude.value,
                longitude: e.target.longitude.value,
                csrf_token: Forms.CSRFToken(e)
            }
            const json = await apiPost("/favorites/store", payload);
            window.location.reload();
        } catch (err) {
            setError(apiError(err));
        }
      
    }

    /**
     * Calls isFavoriteCity to ensure we render add button if and only if 
     * city is not a favorite location.
     */
    useEffect(() => {
        isFavoriteCity();
    });

    return (
        <>
            {!isFavorite && (
                <>
                    {error ? (<p className="text-danger">{error}</p>) : 
                        <form method="POST" onSubmit={handleSubmit}>
                            <Forms.CSRFInput />
                            <Forms.Hidden name="city" value={weather.getCityInfo()} />
                            <Forms.Hidden name="latitude" value={weather.getLatitude()} />
                            <Forms.Hidden name="longitude" value={weather.getLongitude()} />
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-sm mt-1">
                                <i className="me-2 fa fa-plus"></i>Add
                            </button>
                        </form>
                    }
                </>
            )}
        </>
    );
}        
export default FavoritesCheck;