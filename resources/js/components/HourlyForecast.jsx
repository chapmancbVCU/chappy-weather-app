import React from "react";
import "@css/forecast.css";
import useHourly from "@/utils/hooks/useHourly";
import HourlyForecastCard from "./HourlyForecastCard";
import useForecastTime from "@/utils/hooks/useForecastTime";
import useForecastDate from "@/utils/hooks/useForecastDate";
import useDescription from "@/utils/hooks/useDescription";
import useIcon from "@/utils/hooks/useIcon";
import useTemperature from "@/utils/hooks/useTemperature";
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
    const { icon } = useIcon(selectedCard?.weather?.[0]?.icon);
    const { temperature } = useTemperature(units);
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
                <div className="selected-content">
                    {icon && <img src={icon} />}
                    <div className="mb-3">
                        <div className="text-center"><strong>Actual</strong></div>
                        <div className="text-center">{temperature(selectedCard?.temp)}</div>
                    </div>
                    <div className="mb-3">
                        <div className="text-center"><strong>Feels Like</strong></div>
                        <div className="text-center">{temperature(selectedCard?.feels_like)}</div>
                    </div>
                </div>
            </div>

            <hr className="hr-border mx-auto" />
        </div>
    );
}        
export default HourlyForecast;