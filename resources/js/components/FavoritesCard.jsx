import React from "react";
import { apiGet, useAsync } from '@chappy/utils/api';
import Error from "./Error";
import useTemperature from "@/utils/hooks/useTemperature";

function FavoritesCard({ favorite, units }) {
    const { temperature } = useTemperature(units);

    const { 
        data: favoriteData, 
        loading: favoriteLoading, 
        error: favoriteError
    } = useAsync(({ signal}) => {
            if (!favorite) return Promise.resolve(null);
            const u = units || "imperial";
            return apiGet("/weather/currentConditions", { query: { q: favorite.name, units: u }, signal });
    }, [favorite.name, units]);
    const data = favoriteData?.data;

    if(favoriteLoading) return <div className="mt-3 text-center">Loading...</div>

    return (
        <>
            {favoriteError && <Error error={favoriteError} />}
            {!favoriteError && 
                <div className="manage-favorites-card">
                    <h5 className="my-2">{favorite.name}</h5>
                    <p>{temperature(data.main.temp)}</p>
                </div>
            }
        </>
    );
}        
export default FavoritesCard;