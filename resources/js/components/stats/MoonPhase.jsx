import React, { useMemo } from "react";
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
    if(data == null) return;

    const newMoonIcon = asset('public/icons/new-moon.png');
    const waxingCrescent = asset('public/icons/moon-waxing-crescent.png');
    const firstQuarterIcon = asset('public/icons/moon-first-quarter.png');
    const waxingGibbous = asset('public/icons/moon-waxing-gibbous.png')
    const fullMoonIcon = asset('public/icons/full-moon.png');
    const waningGibbous = asset('public/icons/moon-waning-gibbous.png');
    const lastQuarterIcon = asset('public/icons/moon-last-quarter.png');
    const waningCrescent = asset('public/icons/moon-waning-crescent.png');

    const { label, icon } = useMemo(() => {
        if (data === 0 || data === 1) {
            return { label: "New moon", icon: newMoonIcon };
        } else if (data > 0 && data < 0.25) {
            return { label: "Waxing crescent", icon: waxingCrescent };
        } else if (data === 0.25) {
            return { label: "First quarter", icon: firstQuarterIcon };
        } else if (data > 0.25 && data < 0.5) {
            return { label: "Waxing gibbous", icon: waxingGibbous };
        } else if (data === 0.5) {
            return { label: "Full moon", icon: fullMoonIcon };
        } else if (data > 0.5 && data < 0.75) {
            return { label: "Waning gibbous", icon: waningGibbous };
        } else if (data === 0.75) {
            return { label: "Last quarter", icon: lastQuarterIcon };
        } else if (data > 0.75 && data < 1) {
            return { label: "Waning crescent", icon: waningCrescent };
        }
    }, [data]);

    return (
        <div className="forecast-info">
            <div className="forecast-icon-container">
                {icon && <img className="forecast-icon" src={icon} />}    
            </div>
            <div className="forecast-info-block">
                Moon Phase
                <div>
                    {label}
                </div>
            </div>
        </div>
    );
}        
export default MoonPhase;