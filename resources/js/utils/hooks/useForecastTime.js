import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

/**
 * Manages states and hooks for a particular daily forecast card.
 * @param {object} daily The data for a particular day.
 * @param {number} tzOffset The the timezone offset.
 * @returns 
 */
const useForecastTime = (data, tzOffset) => {
    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);

    /**
     * The time associated with the currently selected card.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [time, setTime] = useState("");

    useEffect(() => {
        const stamp = dateTimeUtil.getDateTime(data, tzOffset);
        setTime(dateTimeUtil.getTimeInfo(stamp));
    }, []);

    return {
        time
    }
}

export default useForecastTime;