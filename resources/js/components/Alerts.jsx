import React from "react";
import "@css/alerts.css";

function Alerts({ alerts }) {

    console.log('Alerts:');
    console.log(alerts)
    return (
        <div className="alerts-card my-3">
            <h4 className="text-center text-danger my-2">Alerts in your area</h4>
            <ul>
                {alerts && alerts.map((alert) => (
                    <li key={alert}>{alert.event}</li>
                ))}
            </ul>
        </div>
    );
}        
export default Alerts;