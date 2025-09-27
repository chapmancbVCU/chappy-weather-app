import React, { useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import useWeather from "@/utils/useWeather";
import Error from "@/components/Error";
import "@css/alerts.css";
import AlertCard from "@/components/AlertCard";

function Index() {

    const weather = useMemo(() => new Weather(), []);
    const { 
        city, 
        current,
        currentError, 
        currentLoading, 
        handleToggleChange, 
        isToggled, 
        oneCall,
        oneCallError,
        oneCallLoading,
        onSubmit, 
        units, 
        unitsLabel, 
    } = useWeather(weather);

    if(currentLoading || oneCallLoading) return <div className="mt-3 text-center">Loading...</div>

    const alerts = oneCall?.alerts;
    console.log(alerts);
    return (
        <>
            <SearchBar onSubmit={onSubmit}/>
            {currentError && <Error error={currentError} />}
            {oneCallError && <Error error={oneCallError} />}

            {!currentError && !oneCallError && (
                <div className="mt-3 d-flex flex-column">
                    <h1 className="text-center">Alerts in {city}</h1>
                    {alerts && alerts.map((alert, index) => (
                        <AlertCard key={index} alert={alert}/>
                    ))}
                </div>
            )}
        </>
    );
}        
export default Index;