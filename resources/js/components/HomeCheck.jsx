import React, { useEffect, useState } from "react";
import Forms from "@chappy/components/Forms";
import { apiPut, apiError } from "@chappy/utils/api";

/**
 * A component that renders a button for setting current location as home.  If 
 * already home an icon is rendered to indicate this status.
 * 
 * @property {object} weather An instance of the Weather class.
 * @property {array} favorites The favorites associated with currently logged 
 * in user.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component for rendering button to set location as 
 * home or a home icon if currently user's home.
 */
function HomeCheck({ weather, favorites }) {
    /**
     * Sets value of error if exists.
     * @type {[object, import('react').Dispatch<import('react').SetStateAction<object>>]}
     */
    const [error, setError] = useState(null);

    /**
     * Hook to track currently selected favorite.
     * @type {[object, import('react').Dispatch<import('react').SetStateAction<object>>]}
     */
    const [favorite, setFavorite] = useState(null);

    /**
     * Hook to track if current location is a favorite city.
     * @type {[boolean, import('react').Dispatch<import('react').SetStateAction<boolean>>]}
     */
    const [isFavorite, setIsFavorite] = useState(false);

    /**
     * Hook to track if current location is a the user's home city.
     * @type {[boolean, import('react').Dispatch<import('react').SetStateAction<boolean>>]}
     */
    const [isHome, setIsHome] = useState(false);

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
                setFavorite(favorites[i]);
                break;
            }
        }
    }

    /**
     * Determines if a favorite is currently set as a home location.  Sets 
     * appropriate useState hook if a home location is detected to ensure proper 
     * rendering.
     */
    const isHomeCity = () => {
        const weatherCity = weather.city.toLowerCase();
        for(let i = 0; i < favorites?.length; i++) {
            let homeCity = favorites[i].name.toLowerCase();

            if((homeCity.includes(weatherCity) || weatherCity.includes(homeCity)) && favorites[i].is_home == 1) {
                setIsHome(true);
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
                csrf_token: Forms.CSRFToken(e)
            }
            const json = await apiPut(`/favorites/patch/${favorite.id}`, payload);
            window.location.reload();
        } catch (err) {
            setError(apiError(err));
        }
    }

    /**
     * Ensure favoriteCity and isHome hooks are set.
     */
    useEffect(() => {
        isFavoriteCity();
        isHomeCity();
    });

    return (
        <>
            {isFavorite && (
                <div>
                    {isHome ? (
                        <button className="btn btn-success btn-sm mt-1">
                            <i className="me-2 fa fa-home" aria-hidden="true"></i>Home
                        </button>
                    ) : (
                        <>
                            {error ? (<p className="text-danger">{error}</p>) : 
                                <form method="POST" onSubmit={handleSubmit}>
                                    <Forms.CSRFInput />
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-sm mt-1">
                                        <i className="me-2 fa fa-home"></i>Set Home
                                    </button>
                                </form>
                            }
                        </>
                    )}
                </div>
            )}
        </>
    );
}        
export default HomeCheck;