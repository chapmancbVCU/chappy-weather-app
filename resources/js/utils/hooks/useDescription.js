import { useEffect, useState } from "react";

/**
 * Makes all first case characters of description upper case.
 * @param {string} data Description as presented by Open Weather Map.
 */
const setDescriptionText = (data) =>
    String(data ?? "")
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

/**
 * Sets description for views.
 * @param {string} data Description as presented by Open Weather Map.
 * @returns 
 */
const useDescription = (data) => {
    /**
     * Short description of current conditions.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [description, setDescription] = useState("");

    useEffect(() => {
        setDescription(setDescriptionText(data));
    }, [data])

    return { description }
}

export default useDescription;