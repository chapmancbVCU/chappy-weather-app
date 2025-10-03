import React from "react";
import "@css/forecast.css";
import useHourlyCard from "@/utils/hooks/useHourlyCard";

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
function HourlyForecastCard({ hourly, index, onCardClick, tzOffset }) {
    const {
        date
    } = useHourlyCard(hourly, tzOffset);

    return (
        <>
            <button className="hourly-forecast-card"
            onClick={() => onCardClick(index)}
        >
            {date}
        </button>
        </>
    );
}        
export default HourlyForecastCard;