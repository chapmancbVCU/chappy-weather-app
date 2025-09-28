/**
 * Supports the display of date and time information.
 */
export class DateTimeUtil {
    /**
     * Returns the day of month using the ISO timestamp as parameter.
     * @param {string} timestamp Date and time information in the form of an 
     * ISO string.
     * @returns {string} The day of month contained in ISO timestamp.
     */
    getDayOfMonth(timestamp) {
        let dayOfMonth = timestamp?.toString().slice(5, 7);
        return (dayOfMonth < 10) 
            ? dayOfMonth?.slice(1,2)
            : dayOfMonth;
    }

    
}