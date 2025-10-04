import { useEffect, useState } from "react";

/**
 * Manages the state for weather conditions icon.
 * @param {string} data The name of the icon file.
 * @returns 
 */
const useIcon = (data) => {
    /**
     * Sets icon for the conditions.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [icon, setIcon] = useState("");

    useEffect(() => {
        setIcon(`https://openweathermap.org/img/wn/${data}@2x.png`);
    }, [data]);

    return { icon }
}

export default useIcon;