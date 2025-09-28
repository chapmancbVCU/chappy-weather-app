import React, { useEffect, useState } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

const useCurrentConditions = (conditions, oneCall) => {
    const dateTimeUtil = new DateTimeUtil();

    /**
     * Prop for date in the following format: 
     * <day_of_week>, <month> <day_of_month>, <year>.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [date, setDate] = useState("");

    /**
     * Date time string derived from Unix time.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [dateTimeStamp, setDateTimeStamp] = useState("");

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
     * Sets time for when forecast data was received.
     */
    const currentTime = () => {
        setTime(dateTimeUtil.getTimeInfo(dateTimeStamp));
    }

    /**
     * Obtains summary from oneCall data.
     */
    const getSummary = () => {
        const summary = oneCall?.daily?.[0]?.summary ?? "";
        setSummary(summary);
    }

    /**
     * Sets current date.
     */
    const setCurrentDate = () => {
        setDate(dateTimeUtil.getDateInfo(dateTimeStamp));
    }

    /**
     * Sets time based off of timestamp and timezone offset.
     */
    const setDateTime = () => {
        setDateTimeStamp(dateTimeUtil.getDateTime(
            oneCall?.current?.dt, oneCall?.timezone_offset ?? ""
        ))
    }

    useEffect(() => {
        setDateTime();
        getSummary();
        setCurrentDate();
        currentTime();
    }, [oneCall]);

    return {
        date,
        summary,
        time
    }
}

export default useCurrentConditions;