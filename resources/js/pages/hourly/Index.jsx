import React, { useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import useWeather from "@/utils/hooks/useWeather";
import HourlyForecast from "@/components/HourlyForecast";
import Error from "@/components/Error";
import UnitsSwitch from "@/components/UnitsSwitch";
import Favorites from "@/components/Favorites";
import FavoritesCheck from "@/components/FavoritesCheck";
import Alerts from "@/components/Alerts";
import useFavorites from "@/utils/hooks/useFavorites";
import Minutely from "@/components/Minutely";

/**
 * Renders and handles information for hourly conditions at a specific 
 * location and search.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The home view that displays hourly forecast.
 */
function Index({ user }) {
    const weather = useMemo(() => new Weather(), []);
    const { favorites } = useFavorites();
    
    weather.redirectIfNoData();

    const { 
        current, 
        currentError, 
        currentLoading, 
        handleToggleChange, 
        isToggled, 
        oneCall,
        oneCallError,
        oneCallLoading,
        onSubmit, 
        units, 
        unitsLabel, 
    } = useWeather(weather, true);

    if(currentLoading || oneCallLoading) return <div className="mt-3 text-center">Loading...</div>
    
    return (
        <>
            <SearchBar onSubmit={onSubmit}/>
            {currentError && <Error error={currentError} />}
            {oneCallError && <Error error={oneCallError} />}

            {!currentError && !oneCallError && ( 
                <div className="mt-3 d-flex flex-column mx-auto weather-container">
                    {<UnitsSwitch 
                        isToggled={isToggled} 
                        handleToggleChange={handleToggleChange} 
                        unitsLabel={unitsLabel}/>
                    }
                    {oneCall.alerts && <Alerts alerts={oneCall.alerts}/>}
                    {user && <Favorites  favorites={favorites} units={units} />}
                    <div className="d-flex my-3 flex-row mx-auto">
                        <h2 className="me-4 text-center">Hourly forecast for {current.name}</h2>
                        {user && <FavoritesCheck weather={weather}  favorites={favorites} />}
                    </div>
                    <HourlyForecast oneCall={oneCall} units={units} />
                    <Minutely minutely={oneCall?.minutely}/>
                </div>
            )}
        </>
    );
}        
export default Index;