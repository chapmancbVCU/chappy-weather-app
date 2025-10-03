import React from "react";
import "@css/forecast.css";
import useCommon from "@/utils/hooks/useCommon";
import useDailyCard from "@/utils/hooks/useDailyCard";

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
    const {
        temperatureSymbol
    } = useCommon(units);

    const {
        description,
        date,
        icon
    } = useDailyCard(daily, tzOffset);
    
    return (
        <button className="daily-forecast-card"
            onClick={() => onCardClick(index)}
        >
            <p><strong>{date}</strong></p>
            <p>{description}</p>
            {icon && <img src={icon} alt={description}></img>}
            <div className="d-flex justify-content-evenly">
                <div>
                    <p>Low</p>
                    <p>{`${Math.round(daily?.temp?.min)}\xB0${temperatureSymbol()}`}</p>
                </div>
                <div>
                    <p>High</p>
                    <p>{`${Math.round(daily?.temp?.max)}\xB0${temperatureSymbol()}`}</p>
                </div>
            </div>
        </button>
    );
}        
export default DailyForecastCard;