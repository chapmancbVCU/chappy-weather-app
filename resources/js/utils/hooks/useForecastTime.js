import { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

/**
 * Manages states and hooks for forecast time.
 * @param {object} timestamp The data for a particular time.
 * @param {number} tzOffset The the timezone offset.
 * @returns 
 */
const useForecastTime = (timestamp, tzOffset) => {
    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);

    /**
     * The date for a particular forecast.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [forecastTime, setForecastTime] = useState("");

    useEffect(() => {
        if(timestamp == null || tzOffset == null) return;
        const stamp = dateTimeUtil.getDateTime(timestamp, tzOffset);
        setForecastTime(dateTimeUtil.getTimeInfo(stamp));
    }, [timestamp, tzOffset]);

    return { forecastTime }
}

export default useForecastTime;