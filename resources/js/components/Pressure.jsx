import React, { useState, useEffect } from "react";
import asset from "@chappy/utils/asset";
import "@css/forecast.css";

/**
 * Renders information about air pressure.
 * 
 * @property {number} data The air pressure data.
 * @property {string} units The system of units in use.  
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing air pressure information.
 */
function Pressure({ data, units }) {
    const pressureIcon = asset('public/icons/air-pressure.png');

    /**
     * Sets message for air pressure.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [pressure, setPressure] = useState("");

    /**
     * Set message for air pressure depending on current system of units.
     */
    const pressureText = () => {
        const system = (units === 'imperial') ? "psi" : 'mbar';
        const conversionValue = 0.0295
        const pressure = (units === 'imperial') 
            ? (conversionValue * data).toFixed(1) 
            : data;
        setPressure(`${pressure} ${system}`);
    }

    useEffect(() => {
        pressureText();
    }, [data]);

    return (
        <div className="forecast-info">
            <div className="forecast-icon-container">
                <img className="forecast-icon" src={pressureIcon} />
            </div>
            <div className="forecast-info-block">
                Pressure
                <div>{pressure}</div>
            </div>
        </div>
    );
}        
export default Pressure;