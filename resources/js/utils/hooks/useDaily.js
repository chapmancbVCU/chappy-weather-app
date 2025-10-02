import React, { useEffect, useState, useMemo } from "react";

const useDaily = (oneCall) => {

    const [dailyForecast, setDailyForecast] = useState([]);
    const [selectedCard, setSelectedCard] = useState();
    const [selectedDate, setSelectedDate] = useState("");

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