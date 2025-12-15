import { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";
import { Card } from "../Card";

/**
 * Manages states of hooks for current conditions.
 * @param {object} conditions Standard data.
 * @param {object} oneCall OneCall tier data.
 * @param {string} units Current system of measure.
 * @returns 
 */
const useCurrentConditions = (conditions, oneCall, units) => {
    const card = useMemo(() => new Card(), []);
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
     * Ensure date, time, and summary updates when new location is selected.
     */
    useEffect(() => {
        // Guard: need dt and timezone_offset to compute local date/time
        const dt = oneCall?.current?.dt;
        const tz = oneCall?.timezone_offset;
        if (dt == null || tz == null) return;

        const stamp = dateTimeUtil.getDateTime(dt, tz);
        setTime(dateTimeUtil.getTimeInfo(stamp));
        setDate(dateTimeUtil.getDateInfo(stamp));

        setSummary(oneCall?.daily?.[0]?.summary ?? "");
        card.updateStorage(0);
    }, [conditions, oneCall, units]);

    return {
        date,
        summary,
        time,
    }
}

export default useCurrentConditions;