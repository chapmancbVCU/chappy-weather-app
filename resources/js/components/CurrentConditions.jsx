import React from "react";
import "@css/forecast.css";
import useDescription from "@/utils/hooks/useDescription";
import useTemperature from "@/utils/hooks/useTemperature";
import useCurrentConditions from "@/utils/hooks/useCurrentConditions";
import useIcon from "@/utils/hooks/useIcon";
import asset from "@chappy/utils/asset";
import useWinds from "@/utils/hooks/useWinds";
import useEphemeris from "@/utils/hooks/useEphemeris";
import usePressure from "@/utils/hooks/usePressure";
import useVisibility from "@/utils/hooks/useVisibility";
import DewPoint from "./stats/DewPoint";

/**
 * Renders current conditions.
 * 
 * @property {object} conditions Standard data.
 * @property {object} oneCall The oneCall tier data.
 * @property {string} units The system of units in use.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The current conditions for selected area.
 */
function CurrentConditions({ conditions, oneCall, units }) {
    const { description } = useDescription(conditions?.weather?.[0]?.description);
    const { icon } = useIcon(conditions?.weather?.[0]?.icon);
    const { temperature } = useTemperature(units);
    
    const { 
        moonRise, 
        moonRiseIcon,
        moonSet, 
        moonSetIcon,
        sunRise, 
        sunRiseIcon,
        sunSet,
        sunSetIcon
    } = useEphemeris(oneCall?.daily?.[0], oneCall?.timezone_offset);

    const { 
        date, 
        summary, 
        time,
    } = useCurrentConditions(conditions, oneCall, units);

    const { pressure, pressureIcon } = usePressure(conditions?.main?.pressure, units);

    const { wind, windDirection, windGusts } = useWinds(
        conditions?.wind?.speed, 
        oneCall?.daily?.[0]?.wind_gust, 
        conditions?.wind?.deg, 
        units
    );

    const { visibility, visibilityIcon} = useVisibility(conditions?.visibility, units);

    return (
        <div className="card forecast my-4">
            <h4 className="text-center mt-4">{summary}</h4>
            <div className="section">
                <div className="section-left">
                    <div className="mb-2">{date}</div>
                    <div className="mb-2">As of {time}</div>
                    <div className="fs-2 mb-2">{temperature(conditions?.main?.temp)}</div>
                    <div className="fs-5 mb-2">Today's High: {temperature(conditions?.main?.temp_max)}</div>
                    <div className="fs-5 mb-2">Today's Low: {temperature(conditions?.main?.temp_min)}</div>
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
                                {temperature(conditions?.main?.feels_like)}
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
                            <div>{wind}, {windDirection}</div>
                            Wind Gusts
                            <div>{windGusts}</div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="hr-border mx-auto" />

            <div className="row-section">
                <DewPoint data={oneCall?.current?.dew_point} units={units} />
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
                        <img className="forecast-icon" src={pressureIcon} />
                    </div>
                    <div className="forecast-info-block">
                        Pressure
                        <div>{pressure}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={visibilityIcon} />
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
                        <img className="forecast-icon" src={sunRiseIcon} />
                    </div>
                    <div className="forecast-info-block">
                        Sun Rise
                        <div>{sunRise}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={sunSetIcon} />
                    </div>
                    <div className="forecast-info-block">
                        Sun Set
                        <div>{sunSet}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={moonRiseIcon} />
                    </div>
                    <div className="forecast-info-block">
                        Moon Rise
                        <div>{moonRise}</div>
                    </div>
                </div>
                <div className="forecast-info">
                    <div className="forecast-icon-container">
                        <img className="forecast-icon" src={moonSetIcon} />
                    </div>
                    <div className="forecast-info-block">
                        Moon Set
                        <div>{moonSet}</div>
                    </div>
                </div>
            </div>

            <hr className="hr-border mx-auto" />

            <h4 className="text-center">Temperature Ranges</h4>

            <div className="row-section">
                <div className="temperature">
                    <p className="fs-5 mb-1">Morning</p>
                    <div>
                        Actual: {temperature(oneCall?.daily?.[0]?.temp.morn)}
                    </div>
                    <div>
                        Feels Like: {temperature(oneCall?.daily?.[0]?.feels_like.morn)}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Day</p>
                    <div>
                        Actual: {temperature(oneCall?.daily?.[0]?.temp.day)}
                    </div>
                    <div>
                        Feels Like: {temperature(oneCall?.daily?.[0]?.feels_like.day)}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Evening</p>
                    <div>
                        Actual: {temperature(oneCall?.daily?.[0]?.temp.eve)}
                    </div>
                    <div>
                        Feels Like: {temperature(oneCall?.daily?.[0]?.feels_like.eve)}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Night</p>
                    <div>
                        Actual: {temperature(oneCall?.daily?.[0]?.temp.night)}
                    </div>
                    <div>
                        Feels Like: {temperature(oneCall?.daily?.[0]?.feels_like.night)}
                    </div>
                </div>
            </div>
        </div>
    );
}        
export default CurrentConditions;