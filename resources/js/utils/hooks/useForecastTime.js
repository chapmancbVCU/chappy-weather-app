import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

/**
 * Manages states and hooks for a particular daily forecast card.
 * @param {object} timestamp The data for a particular day.
 * @param {number} tzOffset The the timezone offset.
 * @returns 
 */
const useForecastTime = (timestamp, tzOffset) => {

    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);

    /**
     * The time associated with the currently selected card.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [time, setTime] = useState("");

    useEffect(() => {
        if(timestamp == null || tzOffset == null) return;
        const stamp = dateTimeUtil.getDateTime(timestamp, tzOffset);
        setTime(dateTimeUtil.getTimeInfo(stamp));
    }, []);

    return {
        time
    }
}

export default useForecastTime;