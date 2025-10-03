import React, { useEffect, useState, useMemo } from "react";

/**
 * Manages states and hooks for daily forecast.
 * @param {object} oneCall OneCall tier data.
 * @returns 
 */
const useDaily = (oneCall) => {

    const [dailyForecast, setDailyForecast] = useState([]);
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