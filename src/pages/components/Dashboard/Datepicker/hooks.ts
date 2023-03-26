import dayjs from "dayjs";
import { useState } from "react";

export const useCalendar = ({
  from = dayjs("2023-01-01"),
  to = dayjs(),
}: {
  from?: dayjs.Dayjs;
  to?: dayjs.Dayjs;
}) => {
  const [_date, _setDate] = useState(to);
  const format = "YYYY-MM-DD";

  const moveYearRight = () => {
    return _date.add(1, "y");
  };

  const moveYearLeft = () => {
    return _date.subtract(1, "y");
  };

  const moveMonthRight = () => {
    return _date.add(1, "M");
  };

  const moveMonthLeft = () => {
    return _date.subtract(1, "M");
  };

  const moveDayRight = () => {
    return _date.add(1, "d");
  };

  const moveDayLeft = () => {
    return _date.subtract(1, "d");
  };

  const setDay = (day: number) => {
    _setDate(_date.set("date", day));
  };

  const setMonth = (month: number) => {
    _setDate(_date.set("month", month));
  };

  const setYear = (year: number) => {
    _setDate(_date.set("year", year));
  };

  const setDate = (date: string | dayjs.Dayjs) => {
    _setDate(dayjs(date, format));
  };

  const reachedMaxDay = (day: number) =>
    _date.set("date", day).diff(to, "date") > 0;

  const reachedMinDay = (day: number) =>
    _date.set("date", day).diff(from, "date") < 0;

  const reachedMaxMonth = (month: number) =>
    _date.set("month", month).diff(to, "month") > 0;

  const reachedMinMonth = (month: number) =>
    _date.set("month", month).diff(from, "month") < 0;

  return {
    date: _date,
    format,
    moveYearRight,
    moveYearLeft,
    moveMonthRight,
    moveMonthLeft,
    moveDayRight,
    moveDayLeft,
    setMonth,
    setYear,
    setDay,
    setDate,
    reachedMaxDay,
    reachedMinDay,
    reachedMaxMonth,
    reachedMinMonth,
  };
};
