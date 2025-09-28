/**
 * Supports the display of date and time information.
 */
export class DateTimeUtil {

    getDayOfMonth(timestamp) {
        let dayOfMonth = timestamp?.toString().slice(5, 7);
        return (dayOfMonth < 10) 
            ? dayOfMonth?.slice(1,2)
            : dayOfMonth;
    }
}