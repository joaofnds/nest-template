export type TimeUnit =
  | 'day'
  | 'days'
  | 'hour'
  | 'hours'
  | 'minute'
  | 'minutes'
  | 'second'
  | 'seconds'
  | 'millisecond'
  | 'milliseconds';

const Millisecond = 1;
const Second = 1000 * Millisecond;
const Minute = 60 * Second;
const Hour = 60 * Minute;
const Day = 24 * Hour;

export function inMillis(amount: number, unit: TimeUnit) {
  switch (unit) {
    case 'millisecond':
    case 'milliseconds':
      return amount * Millisecond;
    case 'second':
    case 'seconds':
      return amount * Second;
    case 'minute':
    case 'minutes':
      return amount * Minute;
    case 'hour':
    case 'hours':
      return amount * Hour;
    case 'day':
    case 'days':
      return amount * Day;
  }
}

export function convertDuration(
  amount: number,
  fromUnit: TimeUnit,
  toUnit: TimeUnit,
): number {
  return Math.floor(inMillis(amount, fromUnit) / inMillis(1, toUnit));
}

export function dateAdd(d: Date, amount: number, unit: TimeUnit): Date {
  return new Date(d.getTime() + inMillis(amount, unit));
}

export function dateSub(d: Date, amount: number, unit: TimeUnit): Date {
  return new Date(d.getTime() - inMillis(amount, unit));
}

export function isWithin(
  dates: Date[],
  amount: number,
  unit: TimeUnit,
): boolean {
  const timestamps = dates.map((d) => d.getTime());
  const first = Math.min(...timestamps);
  const last = Math.max(...timestamps);
  return last - first <= inMillis(amount, unit);
}
