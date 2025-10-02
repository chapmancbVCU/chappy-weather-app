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
function CurrentConditions({ conditions, oneCall, units }) {
    const { 
        date, 
        description,
        icon, 
        moonRise,
        moonSet,
        pressure,
        summary, 
        sunRise,
        sunSet,
        temperatureSymbol,
        time,
        visibility,
        wind,
        windDirection,
        windGusts
    } = useCurrentConditions(conditions, oneCall, units);

    return (
        <div className="card forecast mt-4">
            <h4 className="text-center mt-4">{summary}</h4>
            <div className="section">
                <div className="section-left">
                    <div className="mb-2">{date}</div>
                    <div className="mb-2">As of {time}</div>
                    <div className="fs-2 mb-2">{`${Math.round(conditions?.main?.temp)}\xB0${temperatureSymbol()}`}</div>
                    <div className="fs-5 mb-2">Today's High: {`${Math.round(conditions?.main?.temp_max)}\xB0${temperatureSymbol()}`}</div>
                    <div className="fs-5 mb-2">Today's Low: {`${Math.round(conditions?.main?.temp_min)}\xB0${temperatureSymbol()}`}</div>
                    <div className="description">
                        <div className="fs-2">{description}</div>
                        {icon && <img src={icon}/>  }
                    </div>
                </div>
                <div className="section-right">
                    <div className="forecast-info">
                        <div className="forecast-icon-container">
                            <img className="forecast-icon" src={asset('public/icons/temperature-feels-like.svg')} />
                        </div>
                        <div className="forecast-info-block">
                            Feels Like
                            <div>
                                {`${Math.round(conditions?.main?.feels_like)}\xB0${temperatureSymbol()}`}
                            </div>
                        </div>
                    </div>
                    <div className="forecast-info">
                        <div className="forecast-icon-container">
                            <img className="forecast-icon" src={asset('public/icons/humidity.png')} />
                        </div>
                        <div className="forecast-info-block">
                            Humidity
                            <div>
                                {conditions?.main?.humidity}%
                            </div>
                        </div>
                    </div>
                    <div className="forecast-info">
                        <div className="forecast-icon-container">
                            <img className="forecast-icon" src={asset('public/icons/weather-pouring.png')} />
                        </div>
                        <div className="forecast-info-block">
                            Chance of PPT
                            <div>
                                {(oneCall?.daily?.[0]?.pop * 100).toFixed()}%
                            </div>
                        </div>
                    </div>
                    <div className="forecast-info">
                        <div className="forecast-icon-container">
                            <img className="forecast-icon" src={asset('public/icons/weather-windy.png')} />
                        </div>
                        <div className="forecast-info-block">
                            Winds
                            <div>{wind} / {windDirection}</div>
                            Wind Gusts
                            <div>{windGusts}</div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="hr-border mx-auto" />

            <div className="row-section">
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/dew-point.png')} />
                    </div>
                    <div className="forecast-info-block">
                        Dew Point
                        <div>{`${Math.round(oneCall?.current?.dew_point)}\xB0${temperatureSymbol()}`}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/UVI.png')} />
                    </div>
                    <div className="forecast-info-block">
                        UV Index
                        <div>{oneCall?.daily?.[0]?.uvi.toFixed(0)} out of 10</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/air-pressure.png')} />
                    </div>
                    <div className="forecast-info-block">
                        Pressure
                        <div>{pressure}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/visibility.png')} />
                    </div>
                    <div className="forecast-info-block">
                        Visibility
                        <div>{visibility}</div>
                    </div>
                </div>
            </div>

            <hr className="hr-border mx-auto" />

            <div className="row-section">
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/sun-rise.png')} />
                    </div>
                    <div className="forecast-info-block">
                        Sun Rise
                        <div>{sunRise}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/sun-set.png')} />
                    </div>
                    <div className="forecast-info-block">
                        Sun Set
                        <div>{sunSet}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/moon-rise.png')} />
                    </div>
                    <div className="forecast-info-block">
                        Moon Rise
                        <div>{moonRise}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/moon-set.png')} />
                    </div>
                    <div className="forecast-info-block">
                        Moon Set
                        <div>{moonSet}</div>
                    </div>
                </div>
            </div>

            <hr className="hr-border mx-auto" />

            <h4 className="text-center">Temperature Range</h4>

            <div className="row-section">
                <div className="temperature">
                    <p className="fs-5 mb-1">Morning</p>
                    <div>
                        Actual: {`${Math.round(oneCall?.daily?.[0]?.temp.morn)}\xB0${temperatureSymbol()}`}
                    </div>
                    <div>
                        Feels Like: {`${Math.round(oneCall?.daily?.[0]?.feels_like.morn)}\xB0${temperatureSymbol()}`}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Day</p>
                    <div>
                        Actual: {`${Math.round(oneCall?.daily?.[0]?.temp.day)}\xB0${temperatureSymbol()}`}
                    </div>
                    <div>
                        Feels Like: {`${Math.round(oneCall?.daily?.[0]?.feels_like.day)}\xB0${temperatureSymbol()}`}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Evening</p>
                    <div>
                        Actual: {`${Math.round(oneCall?.daily?.[0]?.temp.eve)}\xB0${temperatureSymbol()}`}
                    </div>
                    <div>
                        Feels Like: {`${Math.round(oneCall?.daily?.[0]?.feels_like.eve)}\xB0${temperatureSymbol()}`}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Night</p>
                    <div>
                        Actual: {`${Math.round(oneCall?.daily?.[0]?.temp.night)}\xB0${temperatureSymbol()}`}
                    </div>
                    <div>
                        Feels Like: {`${Math.round(oneCall?.daily?.[0]?.feels_like.night)}\xB0${temperatureSymbol()}`}
                    </div>
                </div>
            </div>
        </div>
    );
}        
export default CurrentConditions;