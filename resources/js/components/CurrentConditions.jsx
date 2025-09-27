import React from "react";
import "@css/forecast.css";

/**
 * Renders current conditions.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The current conditions for selected area.
 */
function CurrentConditions({ conditions, oneCall, units}) {
    return (
        <div className="card forecast mt-4">
            <h4 className="text-center my-3">{oneCall.daily[0].summary}</h4>
        </div>
    );
}        
export default CurrentConditions;