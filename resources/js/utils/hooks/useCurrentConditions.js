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
     * Sets icon for current conditions.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [icon, setIcon] = useState("");

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
        calcMoonRise(oneCall?.daily?.[0]?.moonrise, tz);
        calcMoonSet(oneCall?.daily?.[0]?.moonset, tz);
        calcSunRise(oneCall?.daily?.[0]?.sunrise, tz);
        calcSunSet(oneCall?.daily?.[0]?.sunset, tz);

        setSummary(oneCall?.daily?.[0]?.summary ?? "");

        windSpeed(conditions?.wind?.speed);
        calculateWindDirection(conditions?.wind?.deg);
        windGustSpeed(oneCall?.daily[0]?.wind_gust);

        pressureText(conditions?.main.pressure);
        visibilityText(conditions?.visibility);
        setIcon(`https://openweathermap.org/img/wn/${conditions?.weather?.[0]?.icon}@2x.png`);
    }, [conditions, oneCall, units]);

    return {
        date,
        icon,
        moonRise,
        moonSet,
        pressure,
        summary,
        sunRise,
        sunSet,
        time,
        visibility,
        wind,
        windDirection,
        windGusts
    }
}

export default useCurrentConditions;