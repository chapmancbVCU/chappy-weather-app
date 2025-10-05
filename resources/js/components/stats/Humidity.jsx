import React from "react";
import "@css/forecast.css";
import asset from "@chappy/utils/asset";

/**
 * Renders information about humidity.
 * 
 * @property {number} data The UVI data.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing humidity information.
 */
function Humidity({ data }) {
    if (data == null) return;
    
    return (
        <div className="forecast-info">
            <div className="forecast-icon-container">
                <img className="forecast-icon" src={asset('public/icons/UVI.png')} />
            </div>
            <div className="forecast-info-block">
                Humidity
                <div>{data} %</div>
            </div>
        </div>
    );
}        
export default Humidity;