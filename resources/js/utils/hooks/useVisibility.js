import { useEffect, useState } from "react";
import asset from "@chappy/utils/asset";

/**
 * Manages messaging for visibility.
 * 
 * @param {number} data Visibility value presented by Open Weather Map. 
 * @param {string} units The system of units in use.
 * @returns 
 */
const useVisibility = (data, units) => {
    const visibilityIcon = asset('public/icons/visibility.png');

    /**
     * Sets message for visibility.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [visibility, setVisibility] = useState("");

    /**
     * Sets message for visibility depending on current system of units.
     */
    const visibilityText = () => {
        const imperialConversion = 1609.344;
        const metricConversion = 1000;
        const value = (units === 'imperial') 
            ? (data / imperialConversion).toFixed(1) + ' miles'
            : (data / metricConversion).toFixed(1) + ' km';

        setVisibility(value);
    }

    /**
     * Sets value for visibility text.
     */
    useEffect(() => {
        visibilityText();
    }, [data]);

    return { visibility, visibilityIcon }
}

export default useVisibility;