import React from "react";
import "@css/forecast.css";
import useDaily from "@/utils/hooks/useDaily";
import DailyForecastCard from "./DailyForecastCard";

function DailyForecast({ oneCall, units }) {

    const { 
        dailyForecast, 
        onCardClick, 
        selectedCard 
    } = useDaily(oneCall);
    
    const tzOffset = oneCall?.timezone_offset;
    console.log("selected")
    console.log(selectedCard)
    console.log(onCardClick)
    return (
        <div className="card forecast my-4">
            <div className="daily-forecast-container">
                {dailyForecast && dailyForecast.map((daily, index) => (
                    <DailyForecastCard 
                        key={index}
                        daily={daily}
                        index={index}
                        onCardClick={onCardClick}
                        tzOffset={tzOffset}
                    />
                ))}
            </div>
            <div className="selected-day">
                {selectedCard.summary}
            </div>
        </div>
    );
}        
export default DailyForecast;