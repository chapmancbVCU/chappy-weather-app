import React from "react";
import "@css/forecast.css";
import useDailyCard from "@/utils/hooks/useDailyCard";

function DailyForecastCard({daily, tzOffset}) {
    const {date} = useDailyCard(daily, tzOffset);

    return (
        <div className="daily-forecast-card">
            {date}
        </div>
    );
}        
export default DailyForecastCard;