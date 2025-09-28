/**
 * Supports the display of date and time information.
 */
export class DateTimeUtil {
    /**
     * This function reports the local date in the following format: 
     * <day_of_week>, <month> <day_of_month>, <year>.
     * @param {string} localDateTime The local timestamp.
     * @returns The formatted date.
     */
    getDateInfo(timestamp) {
        return this.getDayOfWeek(timestamp) + ', ' +
            this.getFullMonthName(timestamp) + ' ' +
            this.getDayOfMonth(timestamp) + ', ' +
            timestamp?.slice(12, 16);
    }

    /**
     * Converts unix time to a UTCString and takes into account timezone 
     * offset.
     * @param {Number} unixTime The time as a number that we want to convert to a 
     * string.
     * @param {String} timezoneOffset The timezone offset.
     * @returns {string} A string containing a timestamp.
     */
    getDateTime(timestamp, timezoneOffset) {
        return new Date((timezoneOffset + timestamp) * 1000).toUTCString();
    }

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
        const days = [
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
                return dayOfWeek?.replace(days[i][1], days[i][0]);
            }
        }
    }

    /**
     * Returns the full name of the month using the ISO timestamp as a 
     * parameter.
     * @param {string} timestamp Date and time information in the form of an 
     * ISO string.
     * @returns {string} Full name of month.
     */
    getFullMonthName(timestamp) {
        let months = [
            ['January', 'Jan'],
            ['February', 'Feb'],
            ['March', 'Mar'],
            ['April', 'Apr'],
            ['May', 'May'],
            ['June', 'Jun'],
            ['July', 'Jul'],
            ['August', 'Aug'],
            ['September', 'Sep'],
            ['October', 'Oct'],
            ['November', 'Nov'],
            ['December', 'Dec']
        ];

        let monthName = timestamp?.toString().slice(8, 11);
        for(let i = 0; i < months.length; i++) {
            if(monthName?.includes(months[i][1])) {
                return monthName?.replace(months[i][1], months[i][0]);
            }
        }
    }
}