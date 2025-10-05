import { useEffect, useState } from "react";
import asset from "@chappy/utils/asset";

/**
 * Manages messaging for air pressure.
 * 
 * @param {number} data The value for pressure provided by Open Weather Map.
 * @param {string} units The system of units in use.
 * @returns 
 */
const usePressure = (data, units) => {
    const pressureIcon = asset('public/icons/air-pressure.png');

    /**
     * Sets message for air pressure.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [pressure, setPressure] = useState("")

    /**
     * Set message for air pressure depending on current system of units.
     */
    const pressureText = () => {
        const system = (units === 'imperial') ? "psi" : 'mbar';
        const conversionValue = 0.0295
        const pressure = (units === 'imperial') 
            ? (conversionValue * data).toFixed(1) 
            : data;
        setPressure(`${pressure} ${system}`);
    }

    useEffect(() => {
        pressureText();
    }, [data]);

    return {
        pressure,
        pressureIcon
    }
}

export default usePressure;