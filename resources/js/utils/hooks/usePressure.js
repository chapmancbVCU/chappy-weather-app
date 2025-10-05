import { useEffect, useState } from "react";
import asset from "@chappy/utils/asset";

const usePressure = (data, units) => {
    const pressureIcon = asset('public/icons/air-pressure.png');

    /**
     * Sets message for air pressure.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [pressure, setPressure] = useState("")

    /**
     * Set message for air pressure depending on current system of units.
     * @param {number} data The air pressure value from Open Weather Map.
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