import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

/**
 * Manages states and hooks for forecast date..
 * @param {object} timestamp The timestamp for a particular date.
 * @param {number} tzOffset The the timezone offset.
 * @returns 
 */
const useForecastDate = (timestamp, tzOffset) => {
    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);

    /**
     * The date for a particular forecast.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [date, setDate] = useState("");
    
    useEffect(() => {
        const stamp = dateTimeUtil.getDateTime(timestamp, tzOffset);
        setDate(dateTimeUtil.getForecastDate(stamp));
    }, []);

    return { date }
}

export default useForecastDate;