import React, { useEffect, useState, useMemo } from "react";
import { Weather } from "@/utils/Weather";
import { apiGet, useAsync } from '@chappy/utils/api';
const useWeather = (weather) => {
    // const weather = useMemo(() => weatherArg ?? new Weather(), [weatherArg]);
    const [city, setCity] = useState(null);
    const [units, setUnits] = useState(null)


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
        return apiGet("/weather/onecall", { query: { lat: coords.lat, lon: coords.lon, units: u }, signal });
    }, [coords?.lat, coords?.lon, units]);
    
    const hourly = hourlyData?.data || {};
    console.log(hourly)

    useEffect(() => {
        if(city && units && coords) {
            weather.updateStorage(current, units, city);
        }
    }, [city, units, coords?.lat, coords?.lon, weather]);
    return { city, units, onSubmit, currentError, currentLoading, current, hourly };
}

export default useWeather;