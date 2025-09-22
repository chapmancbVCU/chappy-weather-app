import React, { useEffect, useState } from "react";
import CurrentConditions from "@/components/CurrentConditions";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import { apiGet, useAsync } from '@chappy/utils/api';
function Index({ user }) {
    const [city, setCity] = useState(null);
    const [units, setUnits] = useState(null)
    let weather = new Weather();

    const welcomeMessage = () => {
        
    }
    const getCity = () => {
        weather.getCityInfo()    
            .then(c => {
                setCity(c);
            })
    }

    const getUnits = () => {
        weather.getUnits()    
            .then(u => {
                setUnits(u)
            })
    }

    const onSubmit = (q) => {
        console.log(q);
        setCity(q);
    }


    useEffect(() =>{
        getCity()
        getUnits();
    }, []) 

    const { data, loading, error} = useAsync(({ signal}) => 
        apiGet('/weather/currentConditions', { query: {q: city, units}, signal}),
    [city, units]);
    const conditions = data?.data || {};
    return (
        <>
            <SearchBar onSubmit={onSubmit}/>
            <h2 className="text-center">Conditions in {city}</h2>
            <CurrentConditions 
                city={city} 
                error={error} 
                loading={loading }
                conditions={conditions} 
                units={units} 
            />
        </>
    );
}        
export default Index;