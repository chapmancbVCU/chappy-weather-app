import React from "react";
import "@css/alerts.css";
import route from "@chappy/utils/route";

/**
 * Renders banner containing title of alerts in area.
 * 
 * @property {array} alerts An array of alerts provided by weather service.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The banner with alerts listed.
 */
function Alerts({ alerts }) {

    return (
        <a href={route('alerts')} className="alerts-banner my-3">
            <h4 className="text-center text-danger my-2">Alerts in your area</h4>
            <ul>
                {alerts && alerts.map((alert, index) => (
                    <li className="text-black" key={index}>{alert.event}</li>
                ))}
            </ul>
        </a>
    );
}        
export default Alerts;