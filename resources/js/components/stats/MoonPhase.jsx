import React, { useEffect, useState } from "react";
import asset from "@chappy/utils/asset";

/**
 * Displays information about moon phases.
 * 
 * @property {number} data The current moon phase.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The component that renders current moon phase 
 * information.
 */
function MoonPhase({ data }) {
    
    const newMoonIcon = asset('public/icons/new-moon.png');
    const waxingCrescent = asset('public/icon/moon-waxing-crescent');
    const firstQuarterIcon = asset('public/icons/moon-first-quarter.png');
    const waxingGibbous = asset('public/icons/moon-waxing-gibbous')
    const fullMoonIcon = asset('public/icons/full-moon.png');
    const waningCrescent = asset('public/icons/moon-waning-crescent');
    const lastQuarterIcon = asset('public/icons/moon-last-quarter.png');
    const waningGibbous = asset('public/icons/moon-waning-gibbous');

    const [moonPhase, setMoonPhase] = useState("");
    const [moonIcon, setMoonIcon] = useState("");

    useEffect(() => {

    }, [data]);

    return (
        <div className="forecast-info">
            <div className="forecast-icon-container">
                <img className="forecast-icon" src={moonIcon} />
            </div>
            <div className="forecast-info-block">
                Moon Phase
                <div>
                    {moonPhase}
                </div>
            </div>
        </div>
    );
}        
export default MoonPhase;