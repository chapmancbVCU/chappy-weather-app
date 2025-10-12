import React, { useEffect, useState, useMemo } from "react";
import { DateTimeUtil } from "../DateTimeUtil";
import { Card } from "../Card";
/**
 * Manages states and hooks for daily forecast.
 * @param {object} oneCall OneCall tier data.
 * @returns 
 */
const useDaily = (oneCall, units) => {
    // const dateTimeUtil = useMemo(() => new DateTimeUtil(), []);
    const card = useMemo(() => new Card(), []);
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

    /**
     * Handles event for when user selects a card.
     * @param {number} e Index for the card that is selected.
     */
    const onCardClick = (e) => {
        card.updateStorage(e);
        setSelectedCard(dailyForecast[e]);
    }
    
    useEffect(() => {
        setDailyForecast(oneCall?.daily);
        
    }, [oneCall]);

    useEffect(() => {
        if(!card.matchesPrevious()) {
            card.updateStorage(0);
            setSelectedCard(dailyForecast[0]);
        } else {
            setSelectedCard(dailyForecast[card.getIndex()]);
        }
    }, [dailyForecast])
    
    return {
        dailyForecast,
        onCardClick,
        selectedCard
    }
}

export default useDaily;