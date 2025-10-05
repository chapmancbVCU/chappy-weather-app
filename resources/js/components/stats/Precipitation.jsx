import React, { useEffect, useState } from "react";
import asset from "@chappy/utils/asset";

function Precipitation({ data, units }) {
    if(data == null) return null;
    const rainIcon = asset('public/icons/weather-pouring.png');
    const snowIcon = asset('public/icons/snowflake.png');

    const [rain, setRain] = useState("");
    const [snow, setSnow] = useState("");

    const calculateRainTotal = () => {
        if(data.rain === undefined) return undefined;
        const rain = data.rain;
        if(units === 'imperial') { 
            return imperialConversion(rain).toFixed(2) + '"';
        } 
        return rain + ' mm';
    };

    const calculateSnowTotal = () => {
        if(data.snow === undefined) return undefined;
        const snow = data.snow;
        if(units === 'imperial') { 
            return imperialConversion(snow).toFixed(2) + '"';
        } 
        return snow + ' mm';
    };
    const imperialConversion = (total) => {
        const conversionConstant = 25.4;
        return total * (1/conversionConstant);
    }

    useEffect(() => {
        let rainTotal = calculateRainTotal();
        setRain(calculateRainTotal());
        let snowTotal = calculateSnowTotal();
        setSnow()
        console.log(`Rain: ${rainTotal}`)
        console.log(`Snow: ${snowTotal}`)
    }, [data]);

    return (
        <div className="d-flex flex-column">
            {data.rain && (
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={rainIcon} />
                    </div>
                    <div className="forecast-info-block">
                        Rain
                        <div>{rain}</div>
                    </div>
                </div>
            )}
            {data.snow && (
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={snowIcon} />
                    </div>
                    <div className="forecast-info-block">
                        Snow
                        <div>{snow}</div>
                    </div>
                </div>
            )}
        </div>
    );
}        
export default Precipitation;