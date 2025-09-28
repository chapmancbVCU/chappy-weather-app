import React, { useEffect, useState } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

const useCurrentConditions = (conditions, oneCall) => {
    const dateTimeUtil = new DateTimeUtil();
    const [date, setDate] = useState("");
    const [dateTimeStamp, setDateTimeStamp] = useState("");
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