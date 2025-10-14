import React, { useMemo } from "react";
import documentTitle from "@chappy/utils/documentTitle";
import "@css/forecast.css";
import FavoritesCard from "@/components/FavoritesCard";
import { Weather } from "@/utils/Weather";
import useWeather from "@/utils/hooks/useWeather";
import UnitsSwitch from "@/components/UnitsSwitch";

function ManageFavorites({ favorites }) {
    documentTitle('Your Favorites');
    const weather = useMemo(() => new Weather(), []);

    const {  
        handleToggleChange, 
        isToggled, 
        units, 
        unitsLabel, 
    } = useWeather(weather, false);

    return (
        <div className="d-flex flex-column w-75 mx-auto">
            <h1 className="text-center">Your Favorites</h1>
            {<UnitsSwitch 
                isToggled={isToggled} 
                handleToggleChange={handleToggleChange} 
                unitsLabel={unitsLabel}
            />}
            <div className="manage-favorites-content">
                {favorites && favorites.map((favorite, index) => (
                    <FavoritesCard favorite={favorite} key={index} units={units}/> 
                ))}
            </div>
        </div>
    );
}        
export default ManageFavorites;