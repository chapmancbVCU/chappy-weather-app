import { useEffect, useState } from 'react';

const  useWinds = (speed, gust, direction, units) => {

    /**
     * The wind speed.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [wind, setWind] = useState("");

    /**
     * Wind direction.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [windDirection, setWindDirection] = useState("");

    /**
     * Wind gust speed.
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
     * Sets string representation for current wind gusts.
     * @param {number} data The speed of wind gusts.
     */
    const windGustSpeed = (data) => {
        const system = (units === 'imperial') ? 'mph' : 'km/h';
        setWindGusts(`${Math.round(data)} ${system}`);
    }

    /**
     * Sets string representation for current winds.
     * @param {number} data The speed of winds.
     */
    const windSpeed = (data) => {
        const system = (units === 'imperial') ? 'mph' : 'km/h';
        setWind(`${Math.round(data)} ${system}`);
    }

    useEffect(() => {
        windSpeed(speed);
        calculateWindDirection(direction);
        windGustSpeed(gust);
    }, [speed, gust, direction]);

    return { wind, windDirection, windGusts }
}

export default useWinds;