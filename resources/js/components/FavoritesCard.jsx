import React, { useMemo } from "react";
import { apiGet, useAsync } from '@chappy/utils/api';
import Error from "./Error";
import useTemperature from "@/utils/hooks/useTemperature";
import useIcon from "@/utils/hooks/useIcon";
import useDescription from "@/utils/hooks/useDescription";
import { Weather } from "@/utils/Weather";

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

    if(favoriteLoading) return <div className="mt-3 text-center">Loading...</div>

    return (
        <>
            {favoriteError && <Error error={favoriteError} />}
            {!favoriteError && 
                <button className="manage-favorites-card" onClick={() => onCardClick()}>
                    <h5 className="my-2">{favorite.name}</h5>
                    <p>{description}</p>
                    {icon && <img src={icon} alt={description}></img>}
                    <p>{temperature(data.main.temp)}</p>
                </button>
            }
        </>
    );
}        
export default FavoritesCard;