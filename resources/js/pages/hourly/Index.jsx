import React, { useEffect, useState, useMemo } from "react";
import CurrentConditions from "@/components/CurrentConditions";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import { apiGet, useAsync } from '@chappy/utils/api';

/**
 * Renders and handles information for current conditions at a specific 
 * location and search.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The home view that displays current conditions.
 */
function Index({ user }) {
    const weather = useMemo(() => new Weather(), []);
    const [city, setCity] = useState(null);
    const [units, setUnits] = useState(null)

    const welcomeMessage = () => {
        
    }
    const getCity = () => {
        const locationData = localStorage.getItem('locationData');
        if(weather.locationDataExists()) {
            setCity(weather.getCityInfo())
        } else {
            weather.getCityInfo()    
                .then(c => {
                    setCity(c);
                })
        }
    }
    
    const getUnits = () => {
        const locationData = localStorage.getItem('locationData');
        if(weather.locationDataExists()) {
            setUnits(weather.getUnits())
        } else {
            weather.getUnits()    
                .then(u => {
                    setUnits(u)
                })
        }
    }

    const onSubmit = (q) => {
        setCity(q);
        weather.setLocation(q);
    }


    useEffect(() =>{
        getCity();
        getUnits();
    }, []) 

    const { 
        data: currentData, 
        loading: currentLoading, 
        error: currentError} = useAsync(({ signal}) => {
            if (!city) return Promise.resolve(null);
            const u = units || "imperial";
            return apiGet("/weather/currentConditions", { query: { q: city, units: u }, signal });
        }, [city, units]);

    const current = currentData?.data || {};
    const coords = current?.coord;
    console.log(current)
    
    const {
        data: hourlyData,
        loading: hourlyLoading,
        error: hourlyError,
    } = useAsync(({ signal }) => {
        if (!coords || typeof coords.lat !== "number" || typeof coords.lon !== "number") {
        return Promise.resolve(null);
        }
        const u = units || "imperial";
        return apiGet("/weather/hourly", { query: { lat: coords.lat, lon: coords.lon, units: u }, signal });
    }, [coords?.lat, coords?.lon, units]);
    
    const hourly = hourlyData?.data || {};
    console.log(hourly)

    useEffect(() => {
        if(city && units && coords) {
            weather.updateStorage(current, units, city);
        }
    }, [city, units, current, weather, hourly]);


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
            <div>Hourly lon: {hourly.lon}</div>
        </>
    );
}        
export default Index;