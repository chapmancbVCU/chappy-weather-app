import React from "react";
import "@css/forecast.css";
import useCurrentConditions from "@/utils/useCurrentConditions";

/**
 * Renders current conditions.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The current conditions for selected area.
 */
function CurrentConditions({ conditions, oneCall, units}) {
    const { summary } = useCurrentConditions(conditions, oneCall);

    return (
        <div className="card forecast mt-4">
            <h4 className="text-center my-3">{summary}</h4>
            <div>

            </div>
        </div>
    );
}        
export default CurrentConditions;