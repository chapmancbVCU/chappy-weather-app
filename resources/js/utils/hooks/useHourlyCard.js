import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";

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