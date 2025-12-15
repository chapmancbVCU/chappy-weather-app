import { useEffect, useState, useMemo } from "react";
import { Card } from "../Card";

/**
 * Manages states and hooks for hourly forecast.
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
     * The collection of hourly forecast data.
     * @type {[object, import('react').Dispatch<import('react').SetStateAction<object>>]}
     */
    const [selectedCard, setSelectedCard] = useState();

    /**
     * Handles event for when user selects a card.
     * @param {number} e Index for the card that is selected.
     */
    const onCardClick = (e) => {
        card.updateStorage(e);
        setSelectedCard(hourlyForecast[e]);
    }

    /**
     * Ensure correct hourly forecast data is used when user changes location.
     */
    useEffect(() => {
        setHourlyForecast(oneCall?.hourly);
    }, [oneCall]);

    /**
     * Ensure correct card is selected.  If user refreshes page same card is selected.
     * When user was at a different view we make card at index 0 is selected.
     */
    useEffect(() => {
        if(!card.matchesPrevious()) {
            card.updateStorage(0);
            setSelectedCard(hourlyForecast[0]);
        } else {
            setSelectedCard(hourlyForecast[card.getIndex()]);
        }
    }, [hourlyForecast]);

    return {
        hourlyForecast,
        onCardClick,
        selectedCard
    }
}

export default useHourly;