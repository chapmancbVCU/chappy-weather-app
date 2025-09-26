import { useEffect, useState } from "react";
import { apiGet, useAsync } from '@chappy/utils/api';

/**
 * Manages actions associated with fetching weather data and ensures 
 * consistency between views.
 * @param {Weather} weather Object responsible for tracking information about 
 * currently selected location.
 * @returns 
 */
const useWeather = (weather) => {
    /**
     * The name of the city.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [city, setCity] = useState(null);

    /**
     * Keeps track of units being used.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [units, setUnits] = useState(null)

    /**
     * Sets state of city and units variable based on updates to weather 
     * object.
     */
    useEffect(() => {
        (async () => {
        if (weather.locationDataExists()) {
            setCity(weather.getCityInfo());
            setUnits(weather.getUnits());
        } else {
            setCity(await weather.getCityInfo());
            setUnits(await weather.getUnits());
        }
        })();
    }, [weather]);

    const onSubmit = (q) => {
        setCity(q);
        weather.setLocation(q);
    }

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
        data: oneCallData,
        loading: oneCallLoading,
        error: oneCallError,
    } = useAsync(({ signal }) => {
        if (!coords || typeof coords.lat !== "number" || typeof coords.lon !== "number") {
        return Promise.resolve(null);
        }
        const u = units || "imperial";
        return apiGet("/weather/oneCall", { query: { lat: coords.lat, lon: coords.lon, units: u }, signal });
    }, [coords?.lat, coords?.lon, units]);
    
    const oneCall = oneCallData?.data || {};
    console.log(oneCall)

    useEffect(() => {
        if(city && units && coords) {
            weather.updateStorage(current, units, city);
        }
    }, [city, units, coords?.lat, coords?.lon, weather]);

    return { 
        city, 
        current, 
        currentError, 
        currentLoading,
        oneCall,
        oneCallError,
        oneCallLoading,
        onSubmit, 
        units,
    };
}

export default useWeather;