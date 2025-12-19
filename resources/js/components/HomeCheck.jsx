import React, { useEffect, useState } from "react";
import Forms from "@chappy/components/Forms";
import { apiPost, apiError } from "@chappy/utils/api";

function HomeCheck({ weather, favorites }) {
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
                break;
            }
        }
    }

    const isHomeCity = () => {
        const weatherCity = weather.city.toLowerCase();
        for(let i = 0; i < favorites?.length; i++) {
            let homeCity = favorites[i].name.toLowerCase();

            if((homeCity.includes(weatherCity) || weatherCity.includes(homeCity)) && favorites[i].is_home == 1) {
                console.log("home");
                setIsHome(true);
                break;
            }
        }
    }

    async function handleSubmit(e) {
        const storedWeather = weather.readStorage();
        e.preventDefault();
        try {
            const payload = {
                name: e.target.value.is_home,
                csrf_token: Forms.CSRFToken(e)
            }
            const json = await apiPost("/favorites/store", payload);
            window.location.reload();
        } catch (err) {
            setError(apiError(err));
        }
      
    }

    useEffect(() => {
        isFavoriteCity();
        isHomeCity();
    });

    return (
        <>
            {isFavorite && (
                <div>
                    {isHome ? (
                        <button className="btn btn-success btn-sm">
                            <i className="me-2 fa fa-home" aria-hidden="true"></i>Home
                        </button>
                    ) : (
                        <>
                            {error ? (<p className="text-danger">{error}</p>) : 
                                <form method="POST" onSubmit={handleSubmit}>
                                    <Forms.CSRFInput />
                                    <Forms.Hidden name="is_home" value={weather.getCityInfo()} />
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-sm">
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