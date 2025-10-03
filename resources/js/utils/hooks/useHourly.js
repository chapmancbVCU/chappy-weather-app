import React, { useEffect, useState } from "react";

/**
 * Manages states and hooks for daily forecast.
 * @param {object} oneCall OneCall tier data.
 * @returns 
 */
const useHourly = (oneCall) => {
    /**
     * The collection of hourly forecast data.
     * @type {[array, import('react').Dispatch<import('react').SetStateAction<array>>]}
     */
    const [hourlyForecast, setHourlyForecast] = useState([]);

    /**
     * The data associated with the selected card. 
     * The collection of daily forecast data.
     * @type {[object, import('react').Dispatch<import('react').SetStateAction<object>>]}
     */
    const [selectedCard, setSelectedCard] = useState();

    /**
     * Handles event for when user selects a card.
     * @param {number} e Index for the card that is selected.
     */
    const onCardClick = (e) => {
        setSelectedCard(hourlyForecast[e]);
    }

    useEffect(() => {
        setHourlyForecast(oneCall?.hourly);
    });

    useEffect(() => {
        setSelectedCard(hourlyForecast[0]);
    }, [hourlyForecast]);

    return {
        hourlyForecast,
        onCardClick,
        selectedCard
    }
}

export default useHourly;