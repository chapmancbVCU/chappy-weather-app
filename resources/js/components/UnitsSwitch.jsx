import React from "react";
import cx from "classnames";
import "@css/toggleSwitch.css"
/**
 * @property {string} units The name of the system of units.
 * @param {InputProps} param0 
 * @returns 
 */
function UnitsSwitch({ units }) {

    const sliderCX = cx('slider', { 'rounded': true});
    const label = (units === 'imperial') ? 'F' : 'C'; 
    return (
        <div className="toggle-switch-container me-3">
            <h2>{'\xB0'}{label}</h2>
            <label className="toggle-switch">
                <input type="checkbox"
                    name="isToggled"
                    id="isToggled"
                    // checked={""}
                    // onChange={""}
                />
                <span className={sliderCX} />
            </label>
        </div>
    );
}        
export default UnitsSwitch;