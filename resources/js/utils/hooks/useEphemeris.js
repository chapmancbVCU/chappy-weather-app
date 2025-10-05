import { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";
const useEphemeris = (data, tzOffset) => {
    const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);

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
     * Sets state for moonrise hook.
     * @param {number} timestamp Time for moonrise.
     * @param {number} tz Timezone offset.
     */
    const calcMoonRise = (timestamp) => {
        const moonRiseTime = dateTimeUtil.getDateTime(timestamp, tzOffset);
        setMoonRise(dateTimeUtil.getTimeInfo(moonRiseTime));
    }

    /**
     * Sets state for moonset hook.
     * @param {number} timestamp Time for moonset.
     * @param {number} tz Timezone offset.
     */
    const calcMoonSet = (timestamp) => {
        const moonSetTime = dateTimeUtil.getDateTime(timestamp, tzOffset);
        setMoonSet(dateTimeUtil.getTimeInfo(moonSetTime));
    }

    /**
     * Sets state for sunrise hook.
     * @param {number} timestamp Time for sunrise.
     * @param {number} tz Timezone offset.
     */
    const calcSunRise = (timestamp) => {
        const sunRiseTime = dateTimeUtil.getDateTime(timestamp, tzOffset);
        setSunRise(dateTimeUtil.getTimeInfo(sunRiseTime));
    }

    /**
     * Sets state for sunset hook.
     * @param {number} timestamp Time for sunset.
     * @param {number} tz Timezone offset.
     */
    const calcSunSet = (timestamp) => {
        const sunSetTime = dateTimeUtil.getDateTime(timestamp, tzOffset);
        setSunSet(dateTimeUtil.getTimeInfo(sunSetTime));
    }

    useEffect(() => {
        calcMoonRise(data?.moonrise);
        calcMoonSet(data?.moonset);
        calcSunRise(data?.sunrise);
        calcSunSet(data?.sunset);
    }, [data]);

    return { moonRise, moonSet, sunRise, sunSet }
}

export default useEphemeris;