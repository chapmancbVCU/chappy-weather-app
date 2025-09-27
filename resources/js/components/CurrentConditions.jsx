import React from "react";

/**
 * Renders current conditions.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The current conditions for selected area.
 */
function CurrentConditions({ conditions, units = 'imperial'}) {
    return (
        <div className="card p-3">
            <h5 className="mb-2">{conditions.name}</h5>
            <div>
                {Math.round(conditions.main?.temp)}°{units === 'metric' ? 'C' : 'F'} — {conditions.weather?.[0]?.description}
            </div>
        </div>
    );
}        
export default CurrentConditions;