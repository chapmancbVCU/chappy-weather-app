import React, { useEffect, useState, useMemo } from "react";
import CurrentConditions from "@/components/CurrentConditions";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import { apiGet, useAsync } from '@chappy/utils/api';
import useWeather from "@/utils/useWeather";
/**
 * Renders and handles information for current conditions at a specific 
 * location and search.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The home view that displays current conditions.
 */
function Index({ user }) {
    const weather = useMemo(() => new Weather(), []);
    const { city, units, onSubmit, currentError, currentLoading, current, oneCall } = useWeather(weather);

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
            <div>oneCall lon: {oneCall.lon}</div>
        </>
    );
}        
export default Index;