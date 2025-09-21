import React, { useEffect, useState } from "react";
import CurrentConditions from "@/components/CurrentConditions";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
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

    return (
        <>
            <SearchBar onSubmit={onSubmit}/>
            <h2 className="text-center">Conditions in {city}</h2>
            <CurrentConditions city={city} units={units} />
        </>
    );
}        
export default Index;