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
    if(data == null) return;

    const newMoonIcon = asset('public/icons/new-moon.png');
    const waxingCrescent = asset('public/icon/moon-waxing-crescent.png');
    const firstQuarterIcon = asset('public/icons/moon-first-quarter.png');
    const waxingGibbous = asset('public/icons/moon-waxing-gibbous.png')
    const fullMoonIcon = asset('public/icons/full-moon.png');
    const waningCrescent = asset('public/icons/moon-waning-crescent.png');
    const lastQuarterIcon = asset('public/icons/moon-last-quarter.png');
    const waningGibbous = asset('public/icons/moon-waning-gibbous.png');

    /**
     * Sets moon phase label.
     * @type {[number, import('react').Dispatch<import('react').SetStateAction<number>>]}
     */
    const [moonPhase, setMoonPhase] = useState();

    /**
     * Sets path to correct icon.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [moonIcon, setMoonIcon] = useState("");

    useEffect(() => {
        switch (true) {
            case (data == 0 || data == 1):
                setMoonPhase('New moon');
                setMoonIcon(newMoonIcon);
                break;
            case (data > 1 && data < 0.25):
                setMoonPhase('Waxing crescent');
                setMoonIcon(waxingCrescent);
                break;
            case (data == 0.25):
                setMoonPhase('First quarter');
                setMoonIcon(firstQuarterIcon);
                break;
            case (data > 0.25 && data < 0.5):
                setMoonPhase('Waxing gibbous');
                setMoonIcon(waxingGibbous);
                break;
            case (data == 0.5):
                setMoonPhase('Full moon');
                setMoonIcon(fullMoonIcon);
                break;
            case (data > 0.5 && data < 0.75):
                setMoonPhase('Waning crescent');
                setMoonPhase(waningCrescent);
                break;
            case (data == 0.75):
                setMoonPhase('Last quarter');
                setMoonPhase(lastQuarterIcon);
                break;
            case (data > 0.75 && data < 1):
                setMoonPhase('Waning Gibbous');
                setMoonPhase(waningGibbous);
                break;
            default:
                setMoonPhase('New moon');
                setMoonIcon(newMoonIcon);
        }
    }, [data]);

    return (
        <div className="forecast-info">
            <div className="forecast-icon-container">
                {moonIcon && <img className="forecast-icon" src={moonIcon} />}    
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