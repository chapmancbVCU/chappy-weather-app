import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

const useCurrentConditions = (conditions, oneCall, units) => {
    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);

    /**
     * Prop for date in the following format: 
     * <day_of_week>, <month> <day_of_month>, <year>.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [date, setDate] = useState("");

    /**
     * Short description of current conditions.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [description, setDescription] = useState("");

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
     * Makes all first case characters of description upper case.
     * @param {string} data Description as presented by Open Weather Map.
     */
    const setDescriptionText = (data) => {
        const description = data;;
        const descArr = description.split(" ");
        for(let i = 0; i < descArr.length; i++) {
            descArr[i] = descArr[i][0].toUpperCase() + descArr[i].substring(1);
        }
        setDescription(descArr.join(" "));
    }

    /**
     * Determines temperature symbol based on system used.
     * @returns {string} F or C depending of system used.
     */
    const temperatureSymbol = () => {
        return (units === 'imperial') ? 'F' : 'C';
    }

    useEffect(() => {
        // Guard: need dt and timezone_offset to compute local date/time
        const dt = oneCall?.current?.dt;
        const tz = oneCall?.timezone_offset;
        if (dt == null || tz == null) return;

        // Compute once, then use the local value (not stale state)
        const stamp = dateTimeUtil.getDateTime(dt, tz);
        setTime(dateTimeUtil.getTimeInfo(stamp));
        setDate(dateTimeUtil.getDateInfo(stamp));

        setSummary(oneCall?.daily?.[0]?.summary ?? "");
        setDescriptionText(conditions?.weather[0]?.description);
    }, [conditions, oneCall, units]);

    return {
        date,
        description,
        summary,
        temperatureSymbol,
        time
    }
}

export default useCurrentConditions;