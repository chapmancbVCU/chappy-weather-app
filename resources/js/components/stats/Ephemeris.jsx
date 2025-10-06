import React, { useEffect, useState, useMemo } from "react";
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
    const moonRiseIcon = asset('public/icons/weather-moonset-up.png');
    const moonSetIcon = asset('public/icons/weather-moonset-down.png');
    const sunRiseIcon = asset('public/icons/sun-rise.png');
    const sunSetIcon = asset('public/icons/sun-set.png');

    /**
     * Sets message for moonrise.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [moonRise, setMoonRise] = useState("");

    /**
     * Sets message for moonset.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [moonSet, setMoonSet] = useState("");

    /**
     * Sets message for sunrise.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [sunRise, setSunRise] = useState("");

    /**
     * Sets message for sunset.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [sunSet, setSunSet] = useState("");

    const calculateTime = (timestamp) => {
        return dateTimeUtil.getDateTime(timestamp, tzOffset);
    }

    useEffect(() => {
        const moonRiseTime = calculateTime(data?.moonrise);
        setMoonRise(dateTimeUtil.getTimeInfo(moonRiseTime));

        const moonSetTime = calculateTime(data?.moonset);
        setMoonSet(dateTimeUtil.getTimeInfo(moonSetTime));

        const sunRiseTime = calculateTime(data?.sunrise);
        setSunRise(dateTimeUtil.getTimeInfo(sunRiseTime));

        const sunSetTime = calculateTime(data?.sunset);
        setSunSet(dateTimeUtil.getTimeInfo(sunSetTime));
    }, [data]);

    return (
        <>
            <div className="row-section">
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        {sunRiseIcon && (
                            <img className="forecast-icon" src={sunRiseIcon} />
                        )}
                    </div>
                    <div className="forecast-info-block">
                        Sun Rise
                        <div>{sunRise}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        {sunSetIcon && (
                            <img className="forecast-icon" src={sunSetIcon} />
                        )}
                    </div>
                    <div className="forecast-info-block">
                        Sun Set
                        <div>{sunSet}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        {moonRiseIcon && (
                            <img className="forecast-icon" src={moonRiseIcon} />
                        )}
                    </div>
                    <div className="forecast-info-block">
                        Moon Rise
                        <div>{moonRise}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        {moonSetIcon && (
                            <img className="forecast-icon" src={moonSetIcon} />
                        )}
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