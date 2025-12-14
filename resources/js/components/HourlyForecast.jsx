import React from "react";
import "@css/forecast.css";
import useHourly from "@/utils/hooks/useHourly";
import HourlyForecastCard from "./HourlyForecastCard";
import useForecastTime from "@/utils/hooks/useForecastTime";
import useForecastDate from "@/utils/hooks/useForecastDate";
import useDescription from "@/utils/hooks/useDescription";
import useIcon from "@/utils/hooks/useIcon";
import useTemperature from "@/utils/hooks/useTemperature";
import useWinds from "@/utils/hooks/useWinds";
import asset from "@chappy/utils/asset";
import PPT from "./stats/PPT";
import useVisibility from "@/utils/hooks/useVisibility";
import Humidity from "./stats/Humidity";
import DewPoint from "./stats/DewPoint";
import UVI from "./stats/UVI";
import Pressure from "./Pressure";

/**
 * Renders component for hourly forecast.
 * 
 * @property {object} oneCall The oneCall tier data.
 * @property {string} units The system of units in use.
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component displaying hourly forecast.
 */
function HourlyForecast({ oneCall, units }) {
    const tzOffset = oneCall?.timezone_offset;
    const { hourlyForecast, onCardClick, selectedCard } = useHourly(oneCall);
    const { forecastDate } = useForecastDate(selectedCard?.dt, tzOffset);
    const { forecastTime } = useForecastTime(selectedCard?.dt, tzOffset);
    const { description } = useDescription(selectedCard?.weather?.[0]?.description);
    const { icon } = useIcon(selectedCard?.weather?.[0]?.icon);
    const { temperature } = useTemperature(units);
    const { visibility, visibilityIcon} = useVisibility(selectedCard?.visibility, units);
    const { wind, windDirection, windGusts} = useWinds(
        selectedCard?.wind_speed,
        selectedCard?.wind_gust,
        selectedCard?.wind_deg,
        units
    );

    return (
        <div className="card forecast my-4">
            <div className="hourly-forecast-container">
                {hourlyForecast && hourlyForecast.map((hourly, index) => (
                    <HourlyForecastCard
                        key={index}
                        hourly={hourly}
                        index={index}
                        onCardClick={onCardClick}
                        tzOffset={tzOffset}
                        units={units}
                    />
                ))}
            </div>

            <hr className="hr-border mx-auto" />

            <div className="selected-hour">
                <h5 className="text-center my-2">{forecastDate}, {forecastTime}</h5>
                <p className="text-center my-2">{description}</p>
                <div className="selected-content">
                    {icon && <img src={icon} />}
                    <div className="mb-3">
                        <div className="text-center"><strong>Actual</strong></div>
                        <div className="text-center">{temperature(selectedCard?.temp)}</div>
                    </div>
                    <div className="mb-3">
                        <div className="text-center"><strong>Feels Like</strong></div>
                        <div className="text-center">{temperature(selectedCard?.feels_like)}</div>
                    </div>
                </div>
            </div>

            <hr className="hr-border mx-auto" />

            <div className="row-section"> 
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/weather-windy.png')} />
                    </div>
                    <div className="forecast-info-block">
                        Winds
                        <div>{wind}, {windDirection}</div>
                        Wind Gusts
                        <div>{windGusts}</div>
                    </div>
                </div>   
                <PPT data={selectedCard?.pop} />
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={visibilityIcon} />
                    </div>
                    <div className="forecast-info-block">
                        Visibility
                        <div>{visibility}</div>
                    </div>
                </div>
                <Humidity data={selectedCard?.humidity} />
            </div>

            <hr className="hr-border mx-auto" />

            <div className="row-section">
                <DewPoint data={selectedCard?.dew_point} units={units} />
                <UVI data={selectedCard?.uvi} />
                <Pressure data={selectedCard?.pressure} units={units} />
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={asset('public/icons/clouds.png')} />
                    </div>
                    <div className="forecast-info-block">
                        Cloudiness
                        <div>{selectedCard?.clouds} %</div>
                    </div>
                </div>
            </div>
        </div>
    );
}        
export default HourlyForecast;