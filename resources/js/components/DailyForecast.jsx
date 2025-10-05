import React from "react";
import "@css/forecast.css";
import asset from "@chappy/utils/asset";
import useDaily from "@/utils/hooks/useDaily";
import DailyForecastCard from "./DailyForecastCard";
import useForecastDate from "@/utils/hooks/useForecastDate";
import useIcon from "@/utils/hooks/useIcon";
import useTemperature from "@/utils/hooks/useTemperature";
import useWinds from "@/utils/hooks/useWinds";
import DewPoint from "./stats/DewPoint";

/**
 * Renders component for daily forecast.
 * 
 * @property {object} oneCall The oneCall tier data.
 * @property {string} units The system of units in use.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component displaying daily forecast.
 */
function DailyForecast({ oneCall, units }) {
    const tzOffset = oneCall?.timezone_offset;

    const { dailyForecast, onCardClick, selectedCard } = useDaily(oneCall);
    const { forecastDate } = useForecastDate(selectedCard?.dt, oneCall?.timezone_offset);
    const { icon } = useIcon(selectedCard?.weather?.[0]?.icon);
    const { temperature } = useTemperature(units);

    const { wind, windDirection, windGusts} = useWinds(
        selectedCard?.wind_speed,
        selectedCard?.wind_gust,
        selectedCard?.wind_deg,
        units
    );

    return (
        <div className="card forecast my-4">
            <div className="daily-forecast-container">
                {dailyForecast && dailyForecast.map((daily, index) => (
                    <DailyForecastCard 
                        key={index}
                        daily={daily}
                        index={index}
                        onCardClick={onCardClick}
                        tzOffset={tzOffset}
                        units={units}
                    />
                ))}
            </div>

            <hr className="hr-border mx-auto" />

            <div className="selected-day">
                <h5 className="text-center my-2">{forecastDate}</h5>
                <div>
                    <p className="text-center my-2">{selectedCard?.summary}</p>
                    <div className="selected-content">
                        {icon && <img src={icon}/>}
                        <h4>{temperature(selectedCard?.temp.day)}</h4>
                    </div>
                    <div className="selected-content">
                        <div className="mb-3">
                            <div><strong>Low</strong></div>
                            <div>{temperature(selectedCard?.temp.min)}</div>
                        </div>
                        <div className="mb-3">
                            <div><strong>High</strong></div>
                            <div>{temperature(selectedCard?.temp.max)}</div>
                        </div>
                        <div className="forecast-info mb-3 winds-container">
                            <div className="forecast-icon-container">
                                <img className="forecast-icon" src={asset('public/icons/weather-windy.png')} />
                            </div>
                            <div className="winds">
                                <strong>Winds</strong>
                                <div className="mb-2">{wind}, {windDirection}</div>
                                <strong>Wind Gusts</strong>
                                <div>{windGusts}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="hr-border mx-auto" />

            <h4 className="text-center">Temperature Ranges</h4>

            <div className="row-section">
                <div className="temperature">
                    <p className="fs-5 mb-1">Morning</p>
                    <div>
                        Actual: {temperature(selectedCard?.temp.morn)}
                    </div>
                    <div>
                        Feels Like: {temperature(selectedCard?.feels_like.morn)}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Day</p>
                    <div>
                        Actual: {temperature(selectedCard?.temp.day)}
                    </div>
                    <div>
                        Feels Like: {temperature(selectedCard?.feels_like.day)}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Evening</p>
                    <div>
                        Actual: {temperature(selectedCard?.temp.eve)}
                    </div>
                    <div>
                        Feels Like: {temperature(selectedCard?.feels_like.eve)}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Night</p>
                    <div>
                        Actual: {temperature(selectedCard?.temp.night)}
                    </div>
                    <div>
                        Feels Like: {temperature(selectedCard?.feels_like.night)}
                    </div>
                </div>
            </div>

            <hr className="hr-border mx-auto" />

            <div className="row-section">
                <DewPoint data={selectedCard?.dew_point} units={units} />
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/dew-point.png')} />
                    </div>
                    <div className="forecast-info-block">
                        Dew Point
                        <div>{temperature(selectedCard?.dew_point)}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/UVI.png')} />
                    </div>
                    <div className="forecast-info-block">
                        UV Index
                        <div>{selectedCard?.uvi?.toFixed(0)} out of 10</div>
                    </div>
                </div>
            </div>
        </div>
    );
}        
export default DailyForecast;