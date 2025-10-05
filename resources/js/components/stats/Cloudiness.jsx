import React from "react";
import asset from "@chappy/utils/asset";
import "@css/forecast.css";

/**
 * Renders information about cloud conditions.
 * 
 * @property {number} data The percentage of coverage.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing cloud coverage information.
 */
function Cloudiness({ data }) {
    return (
        <div className="forecast-info">
            <div className="forecast-icon-container">
                <img className="forecast-icon" src={asset('public/icons/UVI.png')} />
            </div>
            <div className="forecast-info-block">
                Cloudiness
                <div>{data} %</div>
            </div>
        </div>
    );
}        
export default Cloudiness;