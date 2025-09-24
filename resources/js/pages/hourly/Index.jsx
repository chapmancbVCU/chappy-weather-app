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
    const [city, setCity] = useState(null);
    const [units, setUnits] = useState(null)
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const weather = useMemo(() => new Weather(), []);

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

    const getLatitude = () => {
        const locationData = localStorage.getItem('locationData');
        if(weather.locationDataExists()) {
            setLat(weather.getLatitude())
        } else {
            weather.getLatitude()    
                .then(c => {
                    setLat(c);
                })
        }
    }

    const getLongitude = () => {
        const locationData = localStorage.getItem('locationData');
        if(weather.locationDataExists()) {
            setLon(weather.getLongitude())
        } else {
            weather.getLongitude()   
                .then(c => {
                    setLon(c);
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
        setLat(null);
        setLon(null);
        weather.setLocation(q);
    }


    useEffect(() =>{
        getCity();
        getUnits();
        getLatitude();
        getLongitude();
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
    console.log(current)

    useEffect(() => {
        const c = current?.coord;
        if (c && typeof c.lat === 'number' && typeof c.lon === 'number') {
        setLat(c.lat);
        setLon(c.lon);
        }
    }, [current?.coord?.lat, current?.coord?.lon]);
    
    const {
        data: hourlyData,
        loading: hourlyLoading,
        error: hourlyError
    } = useAsync(({ signal }) => {
        if (lat == null || lon == null) return Promise.resolve(null);
        const u = units || "imperial";
        return apiGet("/weather/hourly", { query: { lat, lon, units: u }, signal });
    }, [lat, lon, units]);
    
    const hourly = hourlyData?.data || {};
    console.log(hourly)

    useEffect(() => {
        if(city && units && current && Object.keys(current).length) {
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