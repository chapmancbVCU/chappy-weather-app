import React from "react";
import "@css/forecast.css";
import useCurrentConditions from "@/utils/hooks/useCurrentConditions";
import asset
 from "@chappy/utils/asset";
/**
 * Renders current conditions.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The current conditions for selected area.
 */
function CurrentConditions({ conditions, oneCall, units}) {
    const { 
        date, 
        description,
        icon, 
        summary, 
        temperatureSymbol,
        time,
        wind,
        windDirection,
        windGusts
    } = useCurrentConditions(conditions, oneCall, units);

    return (
        <div className="card forecast mt-4">
            <h4 className="text-center mt-4">{summary}</h4>
            <div className="section">
                <div className="section-half section-left">
                    <div>{date}</div>
                    <div className="mb-2">As of {time}</div>
                    <div className="fs-2 mb-2">{`${Math.round(conditions?.main?.temp)}\xB0${temperatureSymbol()}`}</div>
                    <div className="fs-4 mb-2">Today's High: {`${Math.round(conditions?.main?.temp_max)}\xB0${temperatureSymbol()}`}</div>
                    <div className="fs-4 mb-2">Today's Low: {`${Math.round(conditions?.main?.temp_min)}\xB0${temperatureSymbol()}`}</div>
                    <div className="description">
                        <div className="fs-2">{description}</div>
                        {icon && <img src={`https://openweathermap.org/img/wn/${conditions?.weather[0].icon}@2x.png`}/>}   
                    </div>
                </div>
                <div className="section-half section-right">
                    <div className="d-flex me-5 mb-2 align-items-center">
                        <img className="forecast-icon" src={asset('public/icons/temperature-feels-like.svg')} />
                        <div className="ms-2">
                            <div>Feels Like</div>
                            <div>
                                {`${Math.round(conditions?.main?.feels_like)}\xB0${temperatureSymbol()}`}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex me-5 mb-2 align-items-center">
                        <img className="forecast-icon" src={asset('public/icons/humidity.png')} />
                        <div className="ms-2">
                            <div>Humidity</div>
                            <div>
                                {conditions?.main?.humidity}%
                            </div>
                        </div>
                    </div>
                    <div className="d-flex me-2 mb-2 align-items-center">
                        <img className="forecast-icon" src={asset('public/icons/weather-pouring.png')} />
                        <div className="ms-2">
                            <div>Chance of PPT</div>
                            <div>
                                {(oneCall?.daily?.[0]?.pop * 100).toFixed()}%
                            </div>
                        </div>
                    </div>
                    <div className="d-flex me-4 align-items-center">
                        <img className="forecast-icon" src={asset('public/icons/weather-windy.png')} />
                        <div className="ms-2">
                            <div>Winds</div>
                            <div>{wind} / {windDirection}</div>
                            <div>Wind Gusts</div>
                            <div>{windGusts}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}        
export default CurrentConditions;