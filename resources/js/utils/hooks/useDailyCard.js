import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

/**
 * Manages states and hooks for a particular daily forecast card.
 * @param {object} daily The data for a particular day.
 * @param {number} tzOffset The the timezone offset.
 * @returns 
 */
const useDailyCard = (daily, tzOffset) => {
    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);
    const [date, setDate] = useState("");
    
    useEffect(() => {
        const stamp = dateTimeUtil.getDateTime(daily.dt, tzOffset);
        setDate(dateTimeUtil.getForecastDate(stamp))

    }, []);
    return {
        date
    }
}

export default useDailyCard;