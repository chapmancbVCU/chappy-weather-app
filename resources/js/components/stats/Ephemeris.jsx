import React, { useMemo } from "react";
import { DateTimeUtil } from "@/utils/DateTimeUtil";
import asset from "@chappy/utils/asset";

/**
 * Renders information about sunrise, sunset, moonrise, and sunset times.
 * 
 * @param {object} data Information containing daily information for forecast.
 * @param {number} tzOffset The timezone offset.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing time information.
 */
function Ephemeris({ data, tzOffset }) {
    if(data == null) return null;
    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);

    /**
     * Calculates time for specific solar and lunar events.
     * @param {number} timestamp The timestamp for a specific event.
     * @returns {string} The formatted time.
     */
    const calculateTime = (timestamp) => {
        const stamp = dateTimeUtil.getDateTime(timestamp, tzOffset);
        return dateTimeUtil.getTimeInfo(stamp) ?? "";
    }

    /**
     * Sets times for moon rise, moon set, sun rise, and sun set.
     */
    const { sunRise, sunSet, moonRise, moonSet } = useMemo(() => ({
        sunRise:  calculateTime(data.sunrise),
        sunSet:   calculateTime(data.sunset),
        moonRise: calculateTime(data.moonrise),
        moonSet:  calculateTime(data.moonset),
    }), [data]);

    return (
        <>
            <div className="row-section">
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img 
                            className="forecast-icon" 
                            src={asset('public/icons/sun-rise.png')} 
                        />
                    </div>
                    <div className="forecast-info-block">
                        Sun Rise
                        <div>{sunRise}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img 
                            className="forecast-icon" 
                            src={asset('public/icons/sun-set.png')} 
                        />
                    </div>
                    <div className="forecast-info-block">
                        Sun Set
                        <div>{sunSet}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img 
                            className="forecast-icon" 
                            src={asset('public/icons/weather-moonset-up.png')} 
                        />
                    </div>
                    <div className="forecast-info-block">
                        Moon Rise
                        <div>{moonRise}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img 
                            className="forecast-icon" 
                            src={asset('public/icons/weather-moonset-down.png')} 
                        />
                    </div>
                    <div className="forecast-info-block">
                        Moon Set
                        <div>{moonSet}</div>
                    </div>
                </div>
            </div>
        </>
    );
}        
export default Ephemeris;