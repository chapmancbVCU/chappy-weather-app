import React from "react";
import "@css/forecast.css";
import useHourly from "@/utils/hooks/useHourly";
import HourlyForecastCard from "./HourlyForecastCard";

/**
 * Renders component for hourly forecast.
 * 
 * @property {object} oneCall The oneCall tier data.
 * @property {string} units The system of units in use.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component displaying hourly forecast.
 */
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