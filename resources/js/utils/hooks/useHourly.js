import React, { useEffect, useState } from "react";

/**
 * Manages states and hooks for daily forecast.
 * @param {object} oneCall OneCall tier data.
 * @returns 
 */
const useHourly = (oneCall) => {
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [selectedCard, setSelectedCard] = useState();

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