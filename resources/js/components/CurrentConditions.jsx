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
        feelsLike,
        highTemp,
        icon,
        lowTemp, 
        summary, 
        temperature, 
        time
    } = useCurrentConditions(conditions, oneCall, units);

    return (
        <div className="card forecast mt-4">
            <h4 className="text-center mt-4">{summary}</h4>
            <div className="section">
                <div className="section-half section-left">
                    <div>{date}</div>
                    <div className="mb-2">As of {time}</div>
                    <div className="fs-2 mb-2">{temperature}</div>
                    <div className="fs-4 mb-2">Today's High: {highTemp}</div>
                    <div className="fs-4 mb-2">Today's Low: {lowTemp}</div>
                    <div className="description">
                        <div className="fs-2">{description}</div>
                        {icon && <img src={icon}/>}   
                    </div>
                </div>
                <div className="section-half section-right">
                    <div className="d-flex">
                        <img className="forecast-icon" src={asset('public/icons/temperature-feels-like.svg', true)} />
                        <div className="ms-2">
                            <div>Feels Like</div>
                            <div className="">{feelsLike}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}        
export default CurrentConditions;