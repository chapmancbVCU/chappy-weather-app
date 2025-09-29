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
     * Today's low temperature.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [lowTemp, setLowTemp] = useState("");

    /**
     * Today's high temperature.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [highTemp, setHighTemp] = useState("");

    const[icon, setIcon] = useState("");

    /**
     * Short summary of current conditions.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [summary, setSummary] =  useState("")

    /**
     * Current temperature for when forecast data was received.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [temperature, setTemperature] = useState("");

    /**
     * The time for when forecast data was received.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [time, setTime] = useState("");

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
        setIcon(`https://openweathermap.org/img/wn/${conditions?.weather[0].icon}@2x.png`);

        setTemperature(`${Math.round(conditions?.main?.temp)}\xB0${temperatureSymbol()}`);
        setLowTemp(`${Math.round(conditions?.main?.temp_min)}\xB0${temperatureSymbol()}`);
        setHighTemp(`${Math.round(conditions?.main?.temp_max)}\xB0${temperatureSymbol()}`);
    }, [conditions, oneCall, units]);

    return {
        date,
        description,
        highTemp,
        icon,
        lowTemp,
        summary,
        temperature,
        time
    }
}

export default useCurrentConditions;