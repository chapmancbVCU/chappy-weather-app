import React, { useMemo } from "react";
import CurrentConditions from "@/components/CurrentConditions";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import useWeather from "@/utils/useWeather";
import Error from "@/components/Error";

/**
 * Renders and handles information for current conditions at a specific 
 * location and search.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The view that displays current conditions.
 */
function Index({ user }) {
    const weather = useMemo(() => new Weather(), []);
    const { 
        city, 
        current,
        currentError, 
        currentLoading, 
        oneCall,
        oneCallError,
        oneCallLoading,
        onSubmit, 
        units
    } = useWeather(weather);

    if(currentLoading || oneCallLoading) return <div>Loading...</div>

    return (
        <>
            <SearchBar onSubmit={onSubmit}/>
            {currentError && <Error error={currentError} />}
            {oneCallError && <Error error={oneCallError} />}

            {!currentError && !oneCallError && (
                <div className="mt-3">
                    <h2 className="text-center">Conditions in {city}</h2>
                    <CurrentConditions 
                        city={city} 
                        error={currentError} 
                        loading={currentLoading }
                        conditions={current} 
                        units={units} 
                    />
                    <div>Current lon: {current.coord?.lon}</div>
                    <div>OneCall lon: {oneCall.lon}</div>
                </div>
            )}
        </>
    );
}        
export default Index;