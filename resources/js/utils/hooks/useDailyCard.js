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

    /**
     * Sets description for daily card.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [description, setDescription] = useState("");

    /**
     * Sets icon for daily card.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [icon, setIcon] = useState("");

    /**
     * The date associated with the currently selected card.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [date, setDate] = useState("");
    
    useEffect(() => {
        const stamp = dateTimeUtil.getDateTime(daily.dt, tzOffset);
        setDate(dateTimeUtil.getForecastDate(stamp));

        setDescription(daily?.weather?.[0].description);
        setIcon(`https://openweathermap.org/img/wn/${daily?.weather?.[0]?.icon}@2x.png`);
    }, [daily]);

    return {
        description,
        date,
        icon
    }
}

export default useDailyCard;