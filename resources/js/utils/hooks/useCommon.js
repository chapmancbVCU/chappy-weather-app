import React, { useEffect, useState, useMemo, use } from "react";
const useCommon = (descriptionData, units) => {
    /**
     * Short description of current conditions.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [description, setDescription] = useState("");

    /**
     * Makes all first case characters of description upper case.
     * @param {string} data Description as presented by Open Weather Map.
     */
    const setDescriptionText = (data) => {
        const description = data;
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

    useEffect(() => {
        setDescription(descriptionData)
    })
    return {
        description,
        temperatureSymbol
    }
}

export default useCommon;