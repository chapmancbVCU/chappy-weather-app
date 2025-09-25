import React, { useEffect, useState, useMemo } from "react";
import CurrentConditions from "@/components/CurrentConditions";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import { apiGet, useAsync } from '@chappy/utils/api';
import useWeather from "@/utils/useWeather";
/**
 * Renders and handles information for hourly conditions at a specific 
 * location and search.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The  view that displays hourly forecast.
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

    const welcomeMessage = () => {
        
    }
    // if(error) return <div className="text-danger">{error.message}</div>
    return (
        <>
            <SearchBar onSubmit={onSubmit}/>
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
        </>
    );
}        
export default Index;