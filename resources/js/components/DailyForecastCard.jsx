import React from "react";
import "@css/forecast.css";
import useDescription from "@/utils/hooks/useDescription";
import useTemperature from "@/utils/hooks/useTemperature";
import useForecastDate from "@/utils/hooks/useForecastDate";
import useIcon from "@/utils/hooks/useIcon";

/**
 * Renders daily forecast card component.
 * 
 * @property {object} daily The object for weather data from a particular day.
 * @property {index} index The key provided by the map function from parent 
 * component.
 * @property {object} onCardClick The handler for when user clicks on a card.
 * @property {object} tzOffset The the timezone offset.
 * @property {string} units The system of units in use.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The daily forecast card component.
 */
function DailyForecastCard({ daily, index, onCardClick, tzOffset, units }) {
    const { description } = useDescription(daily?.weather?.[0].description);
    const { icon } = useIcon(daily?.weather?.[0]?.icon);
    const { temperature } = useTemperature(units);
    const { forecastDate } = useForecastDate(daily.dt, tzOffset);
    
    return (
        <button className="daily-forecast-card"
            onClick={() => onCardClick(index)}
        >
            <p><strong>{forecastDate}</strong></p>
            <p>{description}</p>
            {icon && <img src={icon} alt={description}></img>}
            <div className="d-flex justify-content-evenly">
                <div>
                    <p>Low</p>
                    <p>{temperature(daily?.temp?.min)}</p>
                </div>
                <div>
                    <p>High</p>
                    <p>{temperature(daily?.temp?.max)}</p>
                </div>
            </div>
        </button>
    );
}        
export default DailyForecastCard;