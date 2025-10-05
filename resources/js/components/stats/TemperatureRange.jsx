import React from "react";
import useTemperature from "@/utils/hooks/useTemperature";
import "@css/forecast.css";

/**
 * Renders information about temperatures.
 * 
 * @property {number} data The weather data.
 * @property {string} units The system of units in use.  
 * @param {InputProps} param0 
 * @returns {JSX.Element} Component containing temperature information.
 */
function TemperatureRange({ data, units }) {
    const { temperature } = useTemperature(units);
    if(data == null) return;

    return (
        <div>
            <h4 className="text-center">Temperature Ranges</h4>

            <div className="row-section">
                <div className="temperature">
                    <p className="fs-5 mb-1">Morning</p>
                    <div>
                        Actual: {temperature(data.temp.morn)}
                    </div>
                    <div>
                        Feels Like: {temperature(data.feels_like.morn)}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Day</p>
                    <div>
                        Actual: {temperature(data.temp.day)}
                    </div>
                    <div>
                        Feels Like: {temperature(data.feels_like.day)}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Evening</p>
                    <div>
                        Actual: {temperature(data.temp.eve)}
                    </div>
                    <div>
                        Feels Like: {temperature(data.feels_like.eve)}
                    </div>
                </div>
                <div className="temperature">
                    <p className="fs-5 mb-1">Night</p>
                    <div>
                        Actual: {temperature(data.temp.night)}
                    </div>
                    <div>
                        Feels Like: {temperature(data.feels_like.night)}
                    </div>
                </div>
            </div>
        </div>
    );
}        
export default TemperatureRange;