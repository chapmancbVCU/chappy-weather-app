import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

/**
 * Manages states of hooks for current conditions.
 * @param {object} conditions Standard data.
 * @param {object} oneCall OneCall tier data.
 * @param {string} units Current system of measure.
 * @returns 
 */
const useCurrentConditions = (conditions, oneCall, units) => {
    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);

    /**
     * Prop for date in the following format: 
     * <day_of_week>, <month> <day_of_month>, <year>.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [date, setDate] = useState("");
    
    /**
     * Short summary of current conditions.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [summary, setSummary] =  useState("")

    /**
     * The time for when forecast data was received.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [time, setTime] = useState("");

    /**
     * Sets message for visibility.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [visibility, setVisibility] = useState("");

    /**
     * Sets message for visibility depending on current system of units.
     * @param {number} data Visibility value presented by Open Weather Map. 
     */
    const visibilityText = (data) => {
        const imperialConversion = 1609.344;
        const metricConversion = 1000;
        const value = (units === 'imperial') 
            ? (data / imperialConversion).toFixed(1) + ' miles'
            : (data / metricConversion).toFixed(1) + ' km';

        setVisibility(value);
    }

    useEffect(() => {
        // Guard: need dt and timezone_offset to compute local date/time
        const dt = oneCall?.current?.dt;
        const tz = oneCall?.timezone_offset;
        if (dt == null || tz == null) return;

        const stamp = dateTimeUtil.getDateTime(dt, tz);
        setTime(dateTimeUtil.getTimeInfo(stamp));
        setDate(dateTimeUtil.getDateInfo(stamp));

        setSummary(oneCall?.daily?.[0]?.summary ?? "");
        visibilityText(conditions?.visibility);
    }, [conditions, oneCall, units]);

    return {
        date,
        summary,
        time,
        visibility,
    }
}

export default useCurrentConditions;