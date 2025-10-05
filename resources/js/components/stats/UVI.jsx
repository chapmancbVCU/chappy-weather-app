import React from "react";
import asset from "@chappy/utils/asset";
import "@css/forecast.css";

/**
 * Renders information about ultraviolet index (UV).
 * 
 * @property {number} data The UVI data.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing UVI information.
 */
function UVI({ data }) {
    if (data == null) return;
    
    return (
        <div className="forecast-info">
            <div className="forecast-icon-container">
                <img className="forecast-icon" src={asset('public/icons/UVI.png')} />
            </div>
            <div className="forecast-info-block">
                UV Index
                <div>{data.toFixed(0)} out of 10</div>
            </div>
        </div>
    );
}        
export default UVI;