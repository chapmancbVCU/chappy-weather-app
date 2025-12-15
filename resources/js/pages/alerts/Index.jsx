import React, { useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import { Weather } from "@/utils/Weather";
import useWeather from "@/utils/hooks/useWeather";
import Error from "@/components/Error";
import "@css/alerts.css";
import AlertCard from "@/components/AlertCard";
import { Card } from "@/utils/Card";
import useFavorites from '@/utils/hooks/useFavorites';
import Favorites from "@/components/Favorites";
import UnitsSwitch from "@/components/UnitsSwitch";

/**
 * Renders view containing alerts.
 * @returns {JSX.Element} View containing list of alerts represented 
 * as cards.
 */
function Index({ user }) {
    const { favorites } = useFavorites();
    const card = useMemo(() => new Card(), []);
    card.updateStorage(0);
    const weather = useMemo(() => new Weather(), []);
    
    const { 
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
        unitsLabel
    } = useWeather(weather);

    if(currentLoading || oneCallLoading) return <div className="mt-3 text-center">Loading...</div>

    const alerts = oneCall?.alerts;

    return (
        <>
            <SearchBar onSubmit={onSubmit}/>
            {currentError && <Error error={currentError} />}
            {oneCallError && <Error error={oneCallError} />}

            {!currentError && !oneCallError && (
                <div className="mt-3 d-flex flex-column mx-auto weather-container">
                    {<UnitsSwitch 
                        isToggled={isToggled} 
                        handleToggleChange={handleToggleChange} 
                        unitsLabel={unitsLabel}/>
                    }
                    {user && <Favorites  favorites={favorites} units={units} />}
                    <h1 className="text-center">Alerts in {current.name}</h1>
                    {alerts && alerts.map((alert, index) => (
                        <AlertCard key={index} alert={alert}/>
                    ))}
                </div>
            )}
        </>
    );
}        
export default Index;