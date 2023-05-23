import {
  TimeUnit,
  convertDuration,
  dateAdd,
  dateSub,
  inMillis,
  isWithin,
} from './time';

describe('inMillis', () => {
  it.each<[number, TimeUnit, number]>([
    [1, 'millisecond', 1],
    [999, 'milliseconds', 999],
    [1, 'second', 1000],
    [123, 'seconds', 123000],
    [1, 'minute', 60000],
    [1, 'minute', 60000],
    [2, 'minutes', 120000],
    [1, 'hour', 3600000],
    [2, 'hours', 7200000],
    [1, 'day', 86400000],
    [2, 'days', 172800000],
  ])('%d %s = %d ms', (amount, unit, expected) => {
    expect(inMillis(amount, unit)).toEqual(expected);
  });
});

describe('convert', () => {
  it.each<[number, TimeUnit, number, TimeUnit]>([
    [1, 'second', 1000, 'milliseconds'],
    [1000, 'milliseconds', 1, 'second'],

    [60, 'seconds', 1, 'minute'],
    [1, 'minute', 60, 'seconds'],

    [60, 'minutes', 1, 'hour'],
    [1, 'hour', 60, 'minutes'],

    [24, 'hours', 1, 'day'],
    [1, 'day', 24, 'hours'],

    [1, 'day', 86_400_000, 'milliseconds'],
    [86_400_000, 'milliseconds', 1, 'day'],

    [59, 'seconds', 0, 'minutes'],
    [61, 'seconds', 1, 'minute'],

    [59, 'minutes', 0, 'hours'],
    [61, 'minutes', 1, 'hour'],

    [23, 'hours', 0, 'days'],
    [25, 'hours', 1, 'day'],
  ])('%d %s = %d %s', (amount, fromUnit, expected, toUnit) => {
    expect(convertDuration(amount, fromUnit, toUnit)).toEqual(expected);
  });
});

describe('dateAdd', () => {
  it.each<[Date, number, TimeUnit, Date]>([
    [new Date(2022, 1, 1, 1, 1), 1, 'minute', new Date(2022, 1, 1, 1, 2)],
    [new Date(2022, 1, 1, 1, 1), 2, 'minutes', new Date(2022, 1, 1, 1, 3)],
    [new Date(2022, 1, 1, 1), 1, 'hour', new Date(2022, 1, 1, 2)],
    [new Date(2022, 1, 1, 1), 2, 'hours', new Date(2022, 1, 1, 3)],
    [new Date(2022, 1, 1), 1, 'day', new Date(2022, 1, 2)],
    [new Date(2022, 1, 1), 2, 'days', new Date(2022, 1, 3)],
  ])('%s + %d %s = %s', (base, amount, unit, date) => {
    expect(dateAdd(base, amount, unit)).toEqual(date);
  });
});

describe('dateSub', () => {
  it.each<[Date, number, TimeUnit, Date]>([
    [new Date(2022, 1, 1, 1, 2), 1, 'minute', new Date(2022, 1, 1, 1, 1)],
    [new Date(2022, 1, 1, 1, 3), 2, 'minutes', new Date(2022, 1, 1, 1, 1)],
    [new Date(2022, 1, 1, 2), 1, 'hour', new Date(2022, 1, 1, 1)],
    [new Date(2022, 1, 1, 3), 2, 'hours', new Date(2022, 1, 1, 1)],
    [new Date(2022, 1, 2), 1, 'day', new Date(2022, 1, 1)],
    [new Date(2022, 1, 3), 2, 'days', new Date(2022, 1, 1)],
  ])('%s + %d %s = %s', (base, amount, unit, date) => {
    expect(dateSub(base, amount, unit)).toEqual(date);
  });
});

describe('isWithin', () => {
  it.each<[Date[], number, TimeUnit]>([
    [
      [
        new Date(2022, 8, 25, 1),
        new Date(2022, 8, 25, 2),
        new Date(2022, 8, 25, 3),
        new Date(2022, 8, 25, 4),
      ],
      1,
      'day',
    ],
    [[new Date(2022, 8, 25), new Date(2022, 8, 26)], 1, 'day'],
    [[new Date(2022, 8, 25), new Date(2022, 8, 27)], 2, 'days'],
    [[new Date(2022, 8, 25), new Date(2022, 9, 1)], 10, 'days'],
    [
      [
        new Date(2022, 8, 25, 1),
        new Date(2022, 8, 25, 1, 20),
        new Date(2022, 8, 25, 1, 40),
      ],
      1,
      'hour',
    ],
    [
      [
        new Date(2022, 8, 25, 1, 10),
        new Date(2022, 8, 25, 1, 10, 20),
        new Date(2022, 8, 25, 1, 10, 40),
      ],
      1,
      'minute',
    ],
  ])('isWithin(%o, %d, %s) is true', (dates, amount, unit) => {
    expect(isWithin(dates, amount, unit)).toEqual(true);
  });

  it.each<[Date[], number, TimeUnit]>([
    [
      [
        new Date(2022, 8, 25, 1),
        new Date(2022, 8, 25, 2),
        new Date(2022, 8, 25, 3),
        new Date(2022, 8, 26, 1, 1),
      ],
      1,
      'day',
    ],
    [
      [
        new Date(2022, 8, 25, 1),
        new Date(2022, 8, 25, 1, 20),
        new Date(2022, 8, 25, 2, 1),
      ],
      1,
      'hour',
    ],
    [
      [
        new Date(2022, 8, 25, 1, 10),
        new Date(2022, 8, 25, 1, 10, 20),
        new Date(2022, 8, 25, 1, 11, 1),
      ],
      1,
      'minute',
    ],
  ])('isWithin(%o, %d, %s) is false', (dates, amount, unit) => {
    expect(isWithin(dates, amount, unit)).toBe(false);
  });
});
