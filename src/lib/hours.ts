import type { Restaurant } from './restaurant';

type HoursEntry = Restaurant['hours'][number];

const DAY_ABBR: Record<string, string> = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
};

export function formatTime(time: string): string {
  const [hourStr, minute] = time.split(':');
  const hour = Number(hourStr);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return minute === '00' ? `${displayHour} ${period}` : `${displayHour}:${minute} ${period}`;
}

export function dayRange(hours: HoursEntry[]): string {
  return hours.length === 1
    ? DAY_ABBR[hours[0].day]
    : `${DAY_ABBR[hours[0].day]}–${DAY_ABBR[hours[hours.length - 1].day]}`;
}

export function timeRange(entry: HoursEntry): string {
  return entry.closed || !entry.open || !entry.close ? 'Closed' : `${formatTime(entry.open)}–${formatTime(entry.close)}`;
}

/** Groups consecutive days sharing the same open/close/closed pattern into ranges, e.g. "Tue-Thu 5-9pm". */
export function condensedHours(hours: HoursEntry[]): { days: string; time: string }[] {
  const groups: HoursEntry[][] = [];

  for (const entry of hours) {
    const last = groups[groups.length - 1];
    const lastEntry = last?.[last.length - 1];
    const sameAsLast = lastEntry && lastEntry.open === entry.open && lastEntry.close === entry.close && lastEntry.closed === entry.closed;
    if (sameAsLast) {
      last.push(entry);
    } else {
      groups.push([entry]);
    }
  }

  return groups.map((group) => ({ days: dayRange(group), time: timeRange(group[0]) }));
}
