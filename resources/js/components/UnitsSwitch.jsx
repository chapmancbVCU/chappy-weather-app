import React from "react";

/**
 * @property {string} units The name of the system of units.
 * @param {InputProps} param0 
 * @returns 
 */
function UnitsSwitch({ units }) {


    const label = (units === 'imperial') ? 'F' : 'C'; 
    return (
        <div className="toggle-switch-container me-3">
            <h2>{'\xB0'}{label}</h2>
            <input type="checkbox"
                name="isToggled"
                id="isToggled"
                // checked={""}
                // onChange={""}
            />
        </div>
    );
}        
export default UnitsSwitch;