import React, { useEffect, useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import { apiGet, useAsync } from '@chappy/utils/api';
import useWeather from "@/utils/useWeather";

/**
 * Renders and handles information for hourly conditions at a specific 
 * location and search.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The home view that displays hourly forecast.
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


    if(oneCallError) return <div className="text-danger">{oneCallError.message}</div>
    if(oneCallLoading) return <div>Loading...</div>
    
    return (
        <>
            <SearchBar onSubmit={onSubmit}/>
            <div className="mt-3">
                <h2 className="text-center">Conditions in {city}</h2>
                <div>Current lon: {current.coord?.lon}</div>
                <div>OneCall lon: {oneCall.lon}</div>
            </div>
        </>
    );
}        
export default Index;