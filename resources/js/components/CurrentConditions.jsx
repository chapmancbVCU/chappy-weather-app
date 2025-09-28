import React from "react";
import "@css/forecast.css";
import useCurrentConditions from "@/utils/hooks/useCurrentConditions";

/**
 * Renders current conditions.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The current conditions for selected area.
 */
function CurrentConditions({ conditions, oneCall, units}) {
    const { date, summary, time } = useCurrentConditions(conditions, oneCall);

    return (
        <div className="card forecast mt-4">
            <p className="text-center mt-3">As of {time} at {date}</p>
            <h4 className="text-center">{summary}</h4>
            <div className="section">
                <div className="section-half"></div>
                <div className="section-half"></div>
            </div>
        </div>
    );
}        
export default CurrentConditions;