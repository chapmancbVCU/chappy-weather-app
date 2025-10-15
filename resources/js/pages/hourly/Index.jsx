import React, { useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import useWeather from "@/utils/hooks/useWeather";
import HourlyForecast from "@/components/HourlyForecast";
import Error from "@/components/Error";
import UnitsSwitch from "@/components/UnitsSwitch";
import Favorites from "@/components/Favorites";
import Alerts from "@/components/Alerts";

/**
 * Renders and handles information for hourly conditions at a specific 
 * location and search.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The home view that displays hourly forecast.
 */
function Index({ user, favorites }) {
    const weather = useMemo(() => new Weather(), []);
    weather.redirectIfNoData();

    const { 
        city, 
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
                    {oneCall.alerts && <Alerts alerts={oneCall.alerts}/>}
                    {user && <Favorites  favorites={favorites} units={units} />}
                    <div className="d-flex justify-content-center">
                        {<UnitsSwitch 
                            isToggled={isToggled} 
                            handleToggleChange={handleToggleChange} 
                            unitsLabel={unitsLabel}/>
                        }
                        <h2 className="ms-3">Hourly forecast for {city}</h2>
                    </div>
                    <HourlyForecast oneCall={oneCall} units={units} />
                </div>
            )}
        </>
    );
}        
export default Index;