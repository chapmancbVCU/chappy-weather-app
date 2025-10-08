import React from "react";
import "@css/forecast.css";
import useHourly from "@/utils/hooks/useHourly";
import HourlyForecastCard from "./HourlyForecastCard";
import useForecastTime from "@/utils/hooks/useForecastTime";
import useForecastDate from "@/utils/hooks/useForecastDate";
import useDescription from "@/utils/hooks/useDescription";
/**
 * Renders component for hourly forecast.
 * 
 * @property {object} oneCall The oneCall tier data.
 * @property {string} units The system of units in use.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component displaying hourly forecast.
 */
function HourlyForecast({ oneCall, units }) {
    const tzOffset = oneCall?.timezone_offset;
    const { hourlyForecast, onCardClick, selectedCard } = useHourly(oneCall);
    const { forecastDate } = useForecastDate(selectedCard?.dt, tzOffset);
    const { forecastTime } = useForecastTime(selectedCard?.dt, tzOffset);
    const { description } = useDescription(selectedCard?.weather?.[0]?.description);
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
                        units={units}
                    />
                ))}
            </div>

            <hr className="hr-border mx-auto" />

            <div className="selected-hour">
                <h5 className="text-center my-2">{forecastDate}, {forecastTime}</h5>
                <p className="text-center my-2">{description}</p>
            </div>
        </div>
    );
}        
export default HourlyForecast;