import React from "react";
import "@css/forecast.css";
import asset from "@chappy/utils/asset";
function PPT({ data }) {

    return (
        <div className="forecast-info">
            <div className="forecast-icon-container">
                <img className="forecast-icon" src={asset('public/icons/weather-pouring.png')} />
            </div>
            <div className="forecast-info-block">
                Chance of PPT
                <div>
                    {(data * 100).toFixed()}%
                </div>
            </div>
        </div>
    );
}        
export default PPT;