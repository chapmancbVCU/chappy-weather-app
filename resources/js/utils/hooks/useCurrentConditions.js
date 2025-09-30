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
     * The current wind speed.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [wind, setWind] = useState("");

    /**
     * Current wind direction.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [windDirection, setWindDirection] = useState("");

    /**
     * Current wind guests.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [windGusts, setWindGusts] = useState("");

    /**
     * Determines string representation of wind direction and 
     * sets state for windDirection.
     * @param {number} deg The direction of winds in degrees.
     */
    const calculateWindDirection = (deg) => {
        let dir = "";
        if ((deg >= 337.6 && deg <= 359.9) || deg >= 0 && deg <= 22.5) {
            dir  = 'S';
        } else if (deg >= 22.6 && deg <= 67.5) {
            dir  = 'SW';
        } else if (deg >= 67.6 && deg <= 112.5) {
            dir  = 'W';
        } else if (deg >= 112.6 && deg <= 157.5) {
            dir  = 'NW';
        } else if (deg >= 157.6 && deg <= 202.5) {
            dir  = 'N';
        } else if (deg >= 202.6 && deg <= 247.5) {
            dir  = 'NE';
        } else if (deg >= 247.6 && deg <= 292.5) {
            dir  = 'E';
        } else if (deg >= 292.6 && deg <= 337.5) {
            dir  = 'SE';
        }

        setWindDirection(dir);
    }

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

    /**
     * Sets string representation for current wind gusts.
     * @param {number} data The speed of wind gusts.
     */
    const windGustSpeed = (data) => {
        const system = ('imperial') ? 'mph' : 'km/h';
        setWindGusts(`${Math.round(data)} ${system}`);
    }

    /**
     * Sets string representation for current winds.
     * @param {number} data The speed of winds.
     */
    const windSpeed = (data) => {
        const system = ('imperial') ? 'mph' : 'km/h';
        setWind(`${Math.round(data)} ${system}`);
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
        setDescriptionText(conditions?.weather[0]?.description);

        windSpeed(conditions?.wind?.speed);
        calculateWindDirection(conditions?.wind?.deg);
        windGustSpeed(oneCall?.daily[0]?.wind_gust);
    }, [conditions, oneCall, units]);

    return {
        date,
        description,
        summary,
        temperatureSymbol,
        time,
        wind,
        windDirection,
        windGusts
    }
}

export default useCurrentConditions;