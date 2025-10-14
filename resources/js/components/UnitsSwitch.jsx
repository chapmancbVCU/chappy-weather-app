import React from "react";
import cx from "classnames";
import "@css/toggleSwitch.css"
/**
 * @property {boolean} isToggled True or false value for state of switch.
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} handleToggleChange - 
 * Function called when the toggle state changes. Receives the checkbox change event.
 * @property {string} unitsLabel Temperature label based on units.
 * @param {InputProps} param0 
 * @returns 
 */
function UnitsSwitch({ isToggled, handleToggleChange, unitsLabel }) {

    const sliderCX = cx('slider', { 'rounded': true});

    return (
        <div className="toggle-switch-container me-3">
            <h2>{'\xB0'}{unitsLabel}</h2>
            <label className="toggle-switch">
                <input type="checkbox"
                    name="isToggled"
                    id="isToggled"
                    checked={isToggled}
                    onChange={handleToggleChange}
                />
                <span className={sliderCX} />
            </label>
        </div>
    );
}        
export default UnitsSwitch;