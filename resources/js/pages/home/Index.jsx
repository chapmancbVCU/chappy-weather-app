import React, { useEffect, useState } from "react";
import CurrentConditions from "@/components/CurrentConditions";
// import geoLoc from "@/utils/geoLocation";
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

    useEffect(() =>{
        getCity()
        getUnits();
    }, []) 

    return (
        <div>
            <h2 className="text-center">Conditions in {city}</h2>
            <CurrentConditions city={city} units={units}/>
        </div>
    );
}        
export default Index;