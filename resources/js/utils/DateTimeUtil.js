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

    /**
     * Returns full day of week using the ISO timestamp as parameter.
     * @param {string} timestamp Date and time information in the form of an 
     * ISO string.
     * @returns {string} Full day of week name.
     */
    getDayOfWeek(timestamp) {
        const days =[
            ['Sunday', 'Sun'],
            ['Monday', 'Mon'],
            ['Tuesday', 'Tue'],
            ['Wednesday', 'Wed'],
            ['Thursday', 'Thu'],
            ['Friday', 'Fri'],
            ['Saturday', 'Sat']
        ];

        let dayOfWeek = timestamp?.toString().slice(0, 3);
        for(let i = 0; i < days.length; i++) {
            if(dayOfWeek?.includes(days[i][1])) {
                return dayOfWeek?.replace(days[i][1], days([i],[0]))
            }
        }
    }
}