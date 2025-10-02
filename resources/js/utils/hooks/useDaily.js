import React, { useEffect, useState, useMemo } from "react";

const useDaily = (oneCall) => {

    const [dailyForecast, setDailyForecast] = useState([]);

    useEffect(() => {
        setDailyForecast(oneCall?.daily);
    });
    return {
        dailyForecast
    }
}

export default useDaily;