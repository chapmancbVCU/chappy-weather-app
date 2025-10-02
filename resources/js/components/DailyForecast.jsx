import React from "react";
import "@css/forecast.css";
import useDaily from "@/utils/hooks/useDaily";
import DailyForecastCard from "./DailyForecastCard";

function DailyForecast({ oneCall, units }) {

    const { dailyForecast } = useDaily(oneCall);
    console.log(dailyForecast)
    return (
        <div className="card forecast my-4">
            <div className="daily-forecast-container">
                {dailyForecast && dailyForecast.map((daily, index) => (
                    <DailyForecastCard key={index}/>
                ))}
            </div>
        </div>
    );
}        
export default DailyForecast;