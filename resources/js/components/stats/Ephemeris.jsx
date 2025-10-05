import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";
function Ephemeris({ data, tzOffset }) {
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

    return (
        <>
        
        </>
    );
}        
export default Ephemeris;