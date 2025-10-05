import React, { useEffect, useState } from "react";
import asset from "@chappy/utils/asset";

function Precipitation({ data, units }) {
    if(data == null) return null;
    const rainIcon = asset('public/icons/weather-pouring.png');
    const snowIcon = asset('public/icons/snowflake.png');

    /**
     * Sets message for rain totals.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [rain, setRain] = useState("");

    /**
     * Sets message for snow totals.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [snow, setSnow] = useState("");

    /**
     * Setup display of rain totals based on systems of units.
     * @returns {string} The rain totals.
     */
    const calculateRainTotal = () => {
        if(data.rain === undefined) return undefined;
        const rainTotal = data.rain;
        if(units === 'imperial') { 
            return imperialConversion(rainTotal)
        }
        return rainTotal + ' mm';
    };

    /**
     * Setup display of snow totals based on systems of units.
     * @returns {string} The snow totals.
     */
    const calculateSnowTotal = () => {
        if(data.snow === undefined) return undefined;
        const snowTotal = data.snow;
        if(units === 'imperial') { 
            return imperialConversion(snowTotal)
        } 
        return snowTotal + ' mm';
    };

    /**
     * Calculates precipitation totals to inches and rounds to 2 decimal places.
     * @param {number} total Total amount of precipitation in mm.
     * @returns 
     */
    const imperialConversion = (total) => {
        const conversionConstant = 25.4;
        return (total * (1/conversionConstant)).toFixed(2) + '"';
    }

    useEffect(() => {
        setRain(calculateRainTotal());
        setSnow(calculateSnowTotal());
    }, [data]);

    return (
        <div className="d-flex flex-column">
            {data.rain && (
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={rainIcon} />
                    </div>
                    <div className="forecast-info-block">
                        Rain
                        <div>{rain}</div>
                    </div>
                </div>
            )}
            {data.snow && (
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={snowIcon} />
                    </div>
                    <div className="forecast-info-block">
                        Snow
                        <div>{snow}</div>
                    </div>
                </div>
            )}
        </div>
    );
}        
export default Precipitation;