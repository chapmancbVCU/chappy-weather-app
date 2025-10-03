import React from "react";
import "@css/forecast.css";
import useHourlyCard from "@/utils/hooks/useHourlyCard";

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