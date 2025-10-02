import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";
const useDailyCard = (daily, tzOffset) => {
    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);
    const [date, setDate] = useState("");
    useEffect(() => {
        console.log(daily.dt);
        console.log(tzOffset)

        const stamp = dateTimeUtil.getDateTime(daily.dt, tzOffset);
        setDate(dateTimeUtil.getForecastDate(stamp))

    }, []);
    return {
        date
    }
}

export default useDailyCard;