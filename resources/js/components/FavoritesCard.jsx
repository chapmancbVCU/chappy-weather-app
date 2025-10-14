import React from "react";
import { apiGet, useAsync } from '@chappy/utils/api';
import Error from "./Error";
import useTemperature from "@/utils/hooks/useTemperature";
import useIcon from "@/utils/hooks/useIcon";
import useDescription from "@/utils/hooks/useDescription";
function FavoritesCard({ favorite, units }) {
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
    
    if(favoriteLoading) return <div className="mt-3 text-center">Loading...</div>

    return (
        <>
            {favoriteError && <Error error={favoriteError} />}
            {!favoriteError && 
                <div className="manage-favorites-card">
                    <h5 className="my-2">{favorite.name}</h5>
                    <p>{description}</p>
                    {icon && <img src={icon} alt={description}></img>}
                    <p>{temperature(data.main.temp)}</p>
                </div>
            }
        </>
    );
}        
export default FavoritesCard;