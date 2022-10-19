export function convertDate(date: Date, txStatus: boolean): Date {
    
    if (txStatus) {
        // get amount of days in following month 
        const currentYear: number = date.getFullYear()
        const currentMonth: number = date.getMonth()
        const daysInFollowingMonth: number = new Date(currentYear, currentMonth + 2, 0).getDate()
        let currentTimezoneOffset: number = date.getTimezoneOffset();
        let newTimezoneOffset: number;
        let newDateTimestamp: number;
        
        
        // caution: setMonth() changes timezone offset of the date
        if(date.getDate() > daysInFollowingMonth) {
            // if number of days in current month is higher than number of days in following month
            // set a date to last day of following month
            newDateTimestamp = date.setMonth(date.getMonth() + 2, 0)
        } else {
            // set the date a month forward
            newDateTimestamp = date.setMonth(date.getMonth() + 1)
        }

        newTimezoneOffset = date.getTimezoneOffset()
        // return new Date taking timezone offset change into account
        return new Date(newDateTimestamp + ((currentTimezoneOffset - newTimezoneOffset) * 60 * 1000))
    } else {
        // set a date 5 days forward (timezone offset doesnt change when using setDate())
        return new Date(date.setDate(date.getDate() + 5));
    }
}