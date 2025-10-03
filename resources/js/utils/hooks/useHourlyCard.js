import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

/**
 * Manages states and hooks for a particular daily forecast card.
 * @param {object} daily The data for a particular day.
 * @param {number} tzOffset The the timezone offset.
 * @returns 
 */
const useHourlyCard = (hourly, tzOffset) => {
    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);
    const [date, setDate] = useState("");

    useEffect(() => {
        const stamp = dateTimeUtil.getDateTime(hourly.dt, tzOffset);
        setDate(dateTimeUtil.getForecastDate(stamp))
    }, []);

    return {
        date
    }
}

export default useHourlyCard;