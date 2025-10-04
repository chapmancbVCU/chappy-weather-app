/**
 * Reusable hook for the temperature symbol.
 * 
 * @param {string} units The system of units in use.
 * @returns 
 */
const useTemperature = (units) => {
    
    /**
     * Determines temperature symbol based on system used.
     * @returns {string} F or C depending of system used.
     */
    const temperature = (data) => {
        const system = (units === 'imperial') ? 'F' : 'C';
        return `${Math.round(data)}\xB0${system}`;
    }

    return {
        temperature
    }
}

export default useTemperature;