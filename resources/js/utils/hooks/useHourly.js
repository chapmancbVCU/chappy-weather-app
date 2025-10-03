import React, { useEffect, useState } from "react";

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