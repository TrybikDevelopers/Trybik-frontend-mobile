import { ONE_WEEK_MS } from '../constants/constants';
import getCurrentWeekType from '../utils/getCurrentWeekType';

export default function initWeekAndDay() {
  const today = new Date();
  const jsDay = today.getDay();

  // If weekend → treat as Monday of *next* week
  const isWeekend = jsDay === 0 || jsDay === 6;
  const effectiveDate = isWeekend
    ? new Date(today.getTime() + ONE_WEEK_MS)
    : today;

  // Calculate week type based on effective date
  const isOddWeek = getCurrentWeekType(effectiveDate);

  // Determine which day to display
  const currentDayIndex = isWeekend ? 0 : jsDay - 1; // Monday=0

  return { isOddWeek, currentDayIndex };
}
