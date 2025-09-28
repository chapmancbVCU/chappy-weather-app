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

    const getSummary = () => {
        const summary = oneCall?.daily?.[0]?.summary ?? "";
        setSummary(summary);
    }

    const setCurrentDate = () => {
        setDate(dateTimeUtil.getDateInfo(dateTimeStamp));
    }

    const setDateTime = () => {
        console.log(oneCall?.timezone_offset)
        setDateTimeStamp(dateTimeUtil.getDateTime(
            oneCall?.current?.dt, oneCall?.timezone_offset ?? ""
        ))
    }

    useEffect(() => {
        setDateTime();
        getSummary();
        setCurrentDate();
    }, [oneCall]);

    return {
        date,
        summary
    }
}

export default useCurrentConditions;