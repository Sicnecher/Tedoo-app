import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours } from 'date-fns';


export default function getTime(date: string){
    const currentDate = new Date();
    const postDate = new Date(date);

    const years = differenceInYears(currentDate, postDate);
    const months = differenceInMonths(currentDate, postDate) - (years * 12);
    const days = differenceInDays(currentDate, postDate) - (years * 365 + months * 30);
    const hours = differenceInHours(currentDate, postDate) - (years * 365 * 24 + months * 30 * 24 + days * 24);

    return {years, months, days, hours};
}