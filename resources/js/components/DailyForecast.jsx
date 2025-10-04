import React from "react";
import "@css/forecast.css";
import useDaily from "@/utils/hooks/useDaily";
import DailyForecastCard from "./DailyForecastCard";
import useForecastDate from "@/utils/hooks/useForecastDate";

/**
 * Renders component for daily forecast.
 * 
 * @property {object} oneCall The oneCall tier data.
 * @property {string} units The system of units in use.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component displaying daily forecast.
 */
function DailyForecast({ oneCall, units }) {
    const tzOffset = oneCall?.timezone_offset;

    const { 
        dailyForecast, 
        onCardClick, 
        selectedCard 
    } = useDaily(oneCall);
    
    const {
        forecastDate
    } = useForecastDate(selectedCard?.dt, oneCall?.timezone_offset);

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
                        units={units}
                    />
                ))}
            </div>

            <hr className="hr-border mx-auto" />

            <div className="selected-day">
                <h5 className="text-center my-2">{forecastDate}</h5>
                <div>
                    <p className="text-center my-2">{selectedCard?.summary}</p>
                </div>
                
            </div>
        </div>
    );
}        
export default DailyForecast;