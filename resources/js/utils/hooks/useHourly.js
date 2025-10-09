import React, { useEffect, useState, useMemo } from "react";
import { Card } from "../Card";
/**
 * Manages states and hooks for daily forecast.
 * @param {object} oneCall OneCall tier data.
 * @returns 
 */
const useHourly = (oneCall) => {
    const card = useMemo(() => new Card(), []);
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
        
    }, [oneCall]);

    useEffect(() => {
        // Use session storage to track between unit changes.
        card.updateStorage(0);
        setSelectedCard(hourlyForecast[0]);
    }, [hourlyForecast]);

    return {
        hourlyForecast,
        onCardClick,
        selectedCard
    }
}

export default useHourly;