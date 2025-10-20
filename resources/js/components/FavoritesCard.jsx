import React, { useMemo } from "react";
import { apiGet, useAsync } from '@chappy/utils/api';
import Error from "./Error";
import useTemperature from "@/utils/hooks/useTemperature";
import useIcon from "@/utils/hooks/useIcon";
import useDescription from "@/utils/hooks/useDescription";
import { Weather } from "@/utils/Weather";

/**
 * Renders card with information related to a favorite location.
 * @property {object} favorite The object for a specific favorite location.
 * @property {string} units The system of units in use.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing card that displays information 
 * for a favorite location.
 */
function FavoritesCard({ favorite, units }) {
    const weather = useMemo(() => new Weather(), []);
    const { temperature } = useTemperature(units);

    const { 
        data: favoriteData, 
        loading: favoriteLoading, 
        error: favoriteError
    } = useAsync(({ signal }) => {
            if (!favorite) return Promise.resolve(null);
            const u = units || "imperial";
            return apiGet("/weather/currentConditions", { query: { q: favorite.name, units: u }, signal });
    }, [favorite.name, units]);
    const data = favoriteData?.data;

    const { description } = useDescription(data?.weather?.[0].description);
    const { icon } = useIcon(data?.weather?.[0]?.icon);

    /**
     * Updates local storage with location information and refreshes page when 
     * the user clicks on a card.
     */
    const onCardClick = () => {
        console.log(favorite.name)
        weather.updateStorage(data, units, favorite.name);
        window.location.reload();
    }

    const onDeleteClick = (e) => {
        console.log(e)
        if(window.confirm(`Are you sure you want to delete the location ${favorite.name}?`)) {

        }
    }

    if(favoriteLoading) return <div className="mt-3 text-center">Loading...</div>

    return (
        <>
            {favoriteError && <Error error={favoriteError} />}
            {!favoriteError && (
                <div>
                    <span className="btn-danger delete-favorite" onClick={() => onDeleteClick(favorite)}><i className="fa fa-times"></i></span>
                    <button className="manage-favorites-card" onClick={() => onCardClick()}>
                        <h5 className="my-2">{favorite.name}</h5>
                        <p>{description}</p>
                        {icon && <img src={icon} alt={description}></img>}
                        <p>{temperature(data.main.temp)}</p>
                    </button>
                </div>
            )
                
            }
        </>
    );
}        
export default FavoritesCard;