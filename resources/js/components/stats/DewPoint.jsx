import React from "react";
import asset from "@chappy/utils/asset";
import useTemperature from "@/utils/hooks/useTemperature";
import "@css/forecast.css";
/**
 * Renders information about dew points.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing dew point information.
 */
function DewPoint({ data, units }) {
    const { temperature } = useTemperature(units);
    return (
        <div className="forecast-info">
            <div className="forecast-icon-container">
                <img className="forecast-icon" src={asset('public/icons/dew-point.png')} />
            </div>
            <div className="forecast-info-block">
                Dew Point
                <div>{temperature(data)}</div>
            </div>
        </div>
    );
}        
export default DewPoint;