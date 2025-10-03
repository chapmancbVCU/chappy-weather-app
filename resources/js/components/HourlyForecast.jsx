import React from "react";
import "@css/forecast.css";
import useHourly from "@/utils/hooks/useHourly";
import HourlyForecastCard from "./HourlyForecastCard";

function HourlyForecast({ oneCall, units }) {

    const {
        hourlyForecast,
        onCardClick,
        selectedCard
    } = useHourly(oneCall)

    const tzOffset = oneCall?.timezone_offset;

    return (
        <div className="card forecast my-4">
            <div className="hourly-forecast-container">
                {hourlyForecast && hourlyForecast.map((hourly, index) => (
                    <HourlyForecastCard
                        key={index}
                        hourly={hourly}
                        index={index}
                        onCardClick={onCardClick}
                        tzOffset={tzOffset}
                    />
                ))}
            </div>
            <div className="selected-hour">
                {selectedCard?.weather?.[0]?.description}
            </div>
        </div>
    );
}        
export default HourlyForecast;