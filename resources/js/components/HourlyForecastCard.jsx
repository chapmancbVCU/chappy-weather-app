import React from "react";
import "@css/forecast.css";
import useHourlyCard from "@/utils/hooks/useHourlyCard";
import useForecastDate from "@/utils/hooks/useForecastDate";
import useTemperature from "@/utils/hooks/useTemperature";
import useIcon from "@/utils/hooks/useIcon";
import useDescription from "@/utils/hooks/useDescription";

/**
 * Renders hourly forecast card component.
 * 
 * @property {object} hourly The object for weather data from a particular 
 * hour.
 * @property {index} index The key provided by the map function from parent 
 * component.
 * @property {object} onCardClick The handler for when user clicks on a card.
 * @property {object} tzOffset The the timezone offset.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The hourly forecast card component.
 */
function HourlyForecastCard({ hourly, index, onCardClick, tzOffset, units }) {
    const {
        time
    } = useHourlyCard(hourly, tzOffset);

    const { description } = useDescription(hourly?.weather?.[0].description);
    const { forecastDate } = useForecastDate(hourly.dt, tzOffset);
    const { icon } = useIcon(hourly?.weather?.[0]?.icon);
    const { temperature } = useTemperature(units);
    return (
        <button className="hourly-forecast-card"
            onClick={() => onCardClick(index)}
        >
            <div><strong>{forecastDate}</strong></div>
            <div className="">{time}</div>
            <p>{description}</p>
            {icon && <img src={icon} ></img>}
            <div className="d-flex justify-content-evenly">
                <div>
                    <p>Actual</p>
                    <p>{temperature(hourly?.temp)}</p>
                </div>
                <div>
                    <p>Feels Like</p>
                    <p>{temperature(hourly?.feels_like)}</p>
                </div>
            </div>
        </button>

    );
}        
export default HourlyForecastCard;