import React from "react";
import "@css/forecast.css";
import useDailyCard from "@/utils/hooks/useDailyCard";

/**
 * Renders daily forecast card component.
 * 
 * @property {object} daily The object for weather data from a particular day.
 * @property {index} index The key provided by the map function from parent 
 * component.
 * @property {object} onCardClick The handler for when user clicks on a card.
 * @property {object} tzOffset The the timezone offset.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The daily forecast card component.
 */
function DailyForecastCard({daily, index, onCardClick, tzOffset}) {
    
    const {
        date
    } = useDailyCard(daily, tzOffset);

    return (
        <button className="daily-forecast-card"
            onClick={() => onCardClick(index)}
        >
            {date}
        </button>
    );
}        
export default DailyForecastCard;