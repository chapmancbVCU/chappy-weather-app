import React, { useEffect, useState } from "react";
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
    const [units, setUnits] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    let weather = new Weather();

    const welcomeMessage = () => {
        
    }
    useEffect(() => {
        (async () => {
        if (weather.locationDataExists()) {
            setCity(weather.getCityInfo());
            setUnits(weather.getUnits());
            setLat(weather.getLatitude());
            setLon(weather.getLongitude());
        } else {
            setCity(await weather.getCityInfo());
            setUnits(await weather.getUnits());
            setLat(await weather.getLatitude());
            setLon(await weather.getLongitude());
        }
        })();
    }, [weather]);

    const onSubmit = (q) => {
        setCity(q);
        weather.setLocation(q);
    }

    const { data, loading, error} = useAsync(({ signal}) => 
        apiGet('/weather/currentConditions', { query: {q: city, units}, signal}),
    [city, units]);
    const conditions = data?.data || {};

    useEffect(() => {
        weather.updateStorage(conditions, units, city);
        weather.readStorage();
    }, [conditions])
    return (
        <>
            <SearchBar onSubmit={onSubmit}/>
            <h2 className="text-center">Conditions in {city}</h2>
            <CurrentConditions 
                city={city} 
                error={error} 
                loading={loading}
                conditions={conditions} 
                units={units} 
            />
        </>
    );
}        
export default Index;