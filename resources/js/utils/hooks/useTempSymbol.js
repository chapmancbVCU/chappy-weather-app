/**
 * Reusable hook for the temperature symbol.
 * @param {string} units The system of units in use.
 * @returns 
 */
const useTempSymbol = (units) => {
    
    /**
     * Determines temperature symbol based on system used.
     * @returns {string} F or C depending of system used.
     */
    const temperatureSymbol = () => {
        return (units === 'imperial') ? 'F' : 'C';
    }

    return {
        temperatureSymbol
    }
}

export default useTempSymbol;