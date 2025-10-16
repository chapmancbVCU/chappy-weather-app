import React, { useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import useWeather from "@/utils/hooks/useWeather";
import DailyForecast from "@/components/DailyForecast";
import Error from "@/components/Error";
import UnitsSwitch from "@/components/UnitsSwitch";
import Favorites from "@/components/Favorites";
import FavoritesCheck from "@/components/FavoritesCheck";
import Alerts from "@/components/Alerts";

/**
 * Renders and handles information for daily forecast at a specific 
 * location and search.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The view that displays daily forecast.
 */
function Index({ user, favorites }) {
    const weather = useMemo(() => new Weather(), []);
    weather.redirectIfNoData();

    const { 
        city, 
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
                <div className="mt-3 d-flex flex-column">
                    {<UnitsSwitch 
                        isToggled={isToggled} 
                        handleToggleChange={handleToggleChange} 
                        unitsLabel={unitsLabel}/>
                    }
                    {oneCall.alerts && <Alerts alerts={oneCall.alerts}/>}
                    {user && <Favorites  favorites={favorites} units={units} />}
                    <div className="d-flex my-3 flex-row mx-auto">
                        <h2 className="me-4 text-center">Daily forecast for {city}</h2>
                        {user && <FavoritesCheck weather={weather} />}
                    </div>
                    <DailyForecast oneCall={oneCall} units={units} current={current}/>
                </div>
            )}
        </>
    );
}        
export default Index;