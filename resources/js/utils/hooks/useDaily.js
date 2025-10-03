import React, { useEffect, useState, useMemo } from "react";

/**
 * Manages states and hooks for daily forecast.
 * @param {object} oneCall OneCall tier data.
 * @returns 
 */
const useDaily = (oneCall) => {

    /**
     * The collection of daily forecast data.
     * @type {[array, import('react').Dispatch<import('react').SetStateAction<array>>]}
     */
    const [dailyForecast, setDailyForecast] = useState([]);

    /**
     * The data associated with the selected card. 
     * The collection of daily forecast data.
     * @type {[object, import('react').Dispatch<import('react').SetStateAction<object>>]}
     */
    const [selectedCard, setSelectedCard] = useState();

    const onCardClick = (e) => {
        setSelectedCard(dailyForecast[e])
    }
    
    useEffect(() => {
        setDailyForecast(oneCall?.daily);
    });

    useEffect(() => {
        setSelectedCard(dailyForecast[0])
    }, [dailyForecast])

    return {
        dailyForecast,
        onCardClick,
        selectedCard
    }
}

export default useDaily;