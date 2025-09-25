import { useEffect, useState } from "react";
import { apiGet, useAsync } from '@chappy/utils/api';
const useWeather = (weather) => {
    const [city, setCity] = useState(null);
    const [units, setUnits] = useState(null)


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