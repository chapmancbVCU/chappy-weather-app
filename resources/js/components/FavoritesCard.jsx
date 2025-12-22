import React, { useEffect, useMemo, useState } from "react";
import { apiDelete, apiGet, useAsync, apiError } from '@chappy/utils/api';
import Error from "./Error";
import useTemperature from "@/utils/hooks/useTemperature";
import useIcon from "@/utils/hooks/useIcon";
import useDescription from "@/utils/hooks/useDescription";
import { Weather } from "@/utils/Weather";
import Forms from "@chappy/components/Forms";

/**
 * Renders card with information related to a favorite location.
 * 
 * @property {object} favorite The object for a specific favorite location.
 * @property {string} units The system of units in use.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing card that displays information 
 * for a favorite location.
 */
function FavoritesCard({ favorite, units }) {
    const weather = useMemo(() => new Weather(), []);
    const { temperature } = useTemperature(units);

    /**
     * Sets value of error if exists.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [error, setError] = useState(null);

    /**
     * Hook to track if current location is a the user's home city.
     * @type {[boolean, import('react').Dispatch<import('react').SetStateAction<boolean>>]}
     */
    const [isHome, setIsHome] = useState(false);

    /**
     * Check if favorite is home location and set to true if that is the case.
     * Otherwise, we set to false.
     */
    const checkIsHome = () => {
        (favorite.is_home == 1) ? setIsHome(true) : setIsHome(false)
    }

    /**
     * Ensure correct home status is set.
     */
    useEffect(() => {
        checkIsHome();
    }, [favorite]);

    /**
     * Retrieves current data for favorites cards.
     */
    const { 
        data: favoriteData, 
        loading: favoriteLoading, 
        error: favoriteError
    } = useAsync(({ signal }) => {
            if (!favorite) return Promise.resolve(null);
            const u = units || "imperial";
            return apiGet("/weather/currentConditions", { query: { q: favorite.name, units: u }, signal });
    }, [favorite, units]);
    const data = favoriteData?.data;

    const { description } = useDescription(data?.weather?.[0].description);
    const { icon } = useIcon(data?.weather?.[0]?.icon);

    /**
     * Updates local storage with location information and refreshes page when 
     * the user clicks on a card.
     */
    const onCardClick = () => {
        weather.updateStorage(data, units, favorite.name);
        window.location.reload();
    }

    /**
     * Handles event related to deleting a favorite.
     * @param {Event} e Event for when user submits a form to delete.
     */
    async function onDeleteClick(e) {
        e.preventDefault()
        if(window.confirm(`Are you sure you want to delete the location ${favorite.name}?`)) {
            try {
                const payload = {
                    csrf_token: Forms.CSRFToken(e)
                }
                const json = await apiDelete(`/favorites/destroy/${favorite.id}`, payload);
                window.location.reload();
            } catch (err) {
                setError(apiError(err));
            }
        }
    }

    if(favoriteLoading) return <div className="mt-3 text-center">Loading...</div>

    return (
        <>
            {favoriteError && <Error error={favoriteError} />}
            {!favoriteError && (
                <div>
                    {error ? (<p className="text-danger">{error}</p>) : 
                        <form method="POST" onSubmit={onDeleteClick}>
                            <Forms.CSRFInput />
                            <button 
                                type="submit" 
                                className="btn-danger delete-favorite">
                                <i className="fa fa-times"></i>
                            </button>
                        </form>
                    }
                    <button className="favorites-card" onClick={() => onCardClick()}>
                        <h5 className="my-2 mx-2">{favorite.name} 
                            {isHome && (
                            <>
                                <i className="me-3 ms-2 fa fa-home" aria-hidden="true"></i>
                            </>
                            
                        )}</h5>
                        <p>{description}</p>
                        {icon && <img src={icon} alt={description}></img>}
                        <p>{temperature(data.main.temp)}</p>
                    </button>
                </div>
            )}
        </>
    );
}        
export default FavoritesCard;