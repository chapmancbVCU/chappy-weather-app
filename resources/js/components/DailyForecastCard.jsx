import React from "react";
import "@css/forecast.css";
import useDailyCard from "@/utils/hooks/useDailyCard";

function DailyForecastCard({daily, index, onCardClick, tzOffset}) {
    const {date} = useDailyCard(daily, tzOffset);
    return (
        <button className="daily-forecast-card"
            onClick={() => onCardClick(index)}
        >
            {date}
        </button>
    );
}        
export default DailyForecastCard;