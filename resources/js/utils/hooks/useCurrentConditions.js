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
     * Sets message for moonrise.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [moonRise, setMoonRise] = useState("");

    /**
     * Sets message for moonset.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [moonSet, setMoonSet] = useState("");

    /**
     * Sets message for air pressure.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [pressure, setPressure] = useState("");
    
    /**
     * Short summary of current conditions.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [summary, setSummary] =  useState("")

    /**
     * Sets message for sunrise.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [sunRise, setSunRise] = useState("");

    /**
     * Sets message for sunset.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [sunSet, setSunSet] = useState("");

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
     * Sets state for moonrise hook.
     * @param {number} data Time for moonrise.
     * @param {number} tz Timezone offset.
     */
    const calcMoonRise = (data, tz) => {
        const moonRiseTime = dateTimeUtil.getDateTime(data, tz);
        setMoonRise(dateTimeUtil.getTimeInfo(moonRiseTime));
    }

    /**
     * Sets state for moonset hook.
     * @param {number} data Time for moonset.
     * @param {number} tz Timezone offset.
     */
    const calcMoonSet = (data, tz) => {
        const moonSetTime = dateTimeUtil.getDateTime(data, tz);
        setMoonSet(dateTimeUtil.getTimeInfo(moonSetTime));
    }

    /**
     * Sets state for sunrise hook.
     * @param {number} data Time for sunrise.
     * @param {number} tz Timezone offset.
     */
    const calcSunRise = (data, tz) => {
        const sunRiseTime = dateTimeUtil.getDateTime(data, tz);
        setSunRise(dateTimeUtil.getTimeInfo(sunRiseTime));
    }

    /**
     * Sets state for sunset hook.
     * @param {number} data Time for sunset.
     * @param {number} tz Timezone offset.
     */
    const calcSunSet = (data, tz) => {
        const sunSetTime = dateTimeUtil.getDateTime(data, tz);
        setSunSet(dateTimeUtil.getTimeInfo(sunSetTime));
    }

    /**
     * Set message for air pressure depending on current system of units.
     * @param {number} data The air pressure value from Open Weather Map.
     */
    const pressureText = (data) => {
        const system = (units === 'imperial') ? "psi" : 'mbar';
        const conversionValue = 0.0295
        const pressure = (units === 'imperial') 
            ? (conversionValue * data).toFixed(1) 
            : data;
        setPressure(`${pressure} ${system}`);
    }

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
        calcMoonRise(oneCall?.daily?.[0]?.moonrise, tz);
        calcMoonSet(oneCall?.daily?.[0]?.moonset, tz);
        calcSunRise(oneCall?.daily?.[0]?.sunrise, tz);
        calcSunSet(oneCall?.daily?.[0]?.sunset, tz);

        setSummary(oneCall?.daily?.[0]?.summary ?? "");

        pressureText(conditions?.main.pressure);
        visibilityText(conditions?.visibility);
    }, [conditions, oneCall, units]);

    return {
        date,
        moonRise,
        moonSet,
        pressure,
        summary,
        sunRise,
        sunSet,
        time,
        visibility,
    }
}

export default useCurrentConditions;