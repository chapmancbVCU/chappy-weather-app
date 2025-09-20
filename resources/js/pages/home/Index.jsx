import React, { useEffect, useState } from "react";
import CurrentConditions from "@/components/CurrentConditions";
// import geoLoc from "@/utils/geoLocation";
import { Weather } from "@/utils/Weather";
function Index({ user }) {
    const [city, setCity] = useState(null);
    let weather = new Weather();
    
    const welcomeMessage = () => {
        
    }
    
    const getCity = () => {
        weather.getCityInfo()    
            .then(d => {
                setCity(d)
            })
    }
    useEffect(() =>{
        getCity()
        
    }, []) 
        
        
        
        
        console.log(city);
    return (
        <div>
            <h2 className="text-center">Conditions in {city}</h2>
            <CurrentConditions city={city} />
        </div>
    );
}        
export default Index;