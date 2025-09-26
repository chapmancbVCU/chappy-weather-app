import React from "react";
import cx from "classnames";
/**
 * @property {string} units The name of the system of units.
 * @param {InputProps} param0 
 * @returns 
 */
function UnitsSwitch({ units }) {
    const rounded = true;
    const sliderCX = cx('slider', { 'rounded': rounded});
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
                <span className={sliderCX}></span>
            </label>
        </div>
    );
}        
export default UnitsSwitch;