import React from "react";
import "@css/forecast.css";
import useDescription from "@/utils/hooks/useDescription";
import useTemperature from "@/utils/hooks/useTemperature";
import useCurrentConditions from "@/utils/hooks/useCurrentConditions";
import useIcon from "@/utils/hooks/useIcon";
import asset from "@chappy/utils/asset";
import useWinds from "@/utils/hooks/useWinds";
import Ephemeris from "./stats/Ephemeris";
import Pressure from "./Pressure";
import useVisibility from "@/utils/hooks/useVisibility";
import DewPoint from "./stats/DewPoint";
import UVI from "./stats/UVI";
import TemperatureRange from "./stats/TemperatureRange";
import Humidity from "./stats/Humidity";

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
    
    // const { 
    //     moonRise, 
    //     moonRiseIcon,
    //     moonSet, 
    //     moonSetIcon,
    //     sunRise, 
    //     sunRiseIcon,
    //     sunSet,
    //     sunSetIcon
    // } = useEphemeris(oneCall?.daily?.[0], oneCall?.timezone_offset);

    const { 
        date, 
        summary, 
        time,
    } = useCurrentConditions(conditions, oneCall, units);

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

                    <Humidity data={conditions?.main?.humidity} />
                    
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
                <UVI data={oneCall?.daily?.[0]?.uvi} />
                <Pressure data={conditions?.main?.pressure} units={units} />
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
            <Ephemeris data={oneCall?.daily?.[0]} tzOffset={oneCall?.timezone_offset} />         
            <hr className="hr-border mx-auto" />
            <TemperatureRange data={oneCall?.daily?.[0]} units={units} />
        </div>
    );
}        
export default CurrentConditions;