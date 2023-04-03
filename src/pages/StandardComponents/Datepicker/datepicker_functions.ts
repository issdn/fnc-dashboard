import type { KeyboardEvent, MouseEvent } from "react";
import type { useCalendar } from "./hooks";
import dayjs from "dayjs";

const select = (target: HTMLInputElement, start: number) => {
  target.setSelectionRange(start, start);
};

const getSelectionInfo = (target: HTMLInputElement, selectionStart: number) => {
  const [year, month, day] = target.value.split("-");
  if (!year || !month || !day) throw new Error("Invalid date format.");

  const [dayLength, monthLength, yearLength] = [
    day.length,
    month.length,
    year.length,
  ];

  const yearStartSelectionPosition = 0;
  const monthStartSelectionPosition =
    yearStartSelectionPosition + yearLength + 1;
  const dayStartSelectionPosition =
    monthStartSelectionPosition + monthLength + 1;

  const yearEndSelectionPosition = yearStartSelectionPosition + yearLength;
  const monthEndSelectionPosition = monthStartSelectionPosition + monthLength;
  const dayEndSelectionPosition = dayStartSelectionPosition + dayLength;

  const isYearSelected =
    selectionStart >= yearStartSelectionPosition &&
    selectionStart <= yearEndSelectionPosition;
  const isMonthSelected =
    selectionStart >= monthStartSelectionPosition &&
    selectionStart <= monthEndSelectionPosition;
  const isDaySelected =
    selectionStart >= dayStartSelectionPosition &&
    selectionStart <= dayEndSelectionPosition;

  return {
    year,
    month,
    day,
    yearLength,
    monthLength,
    dayLength,
    yearStartSelectionPosition,
    monthStartSelectionPosition,
    dayStartSelectionPosition,
    yearEndSelectionPosition,
    monthEndSelectionPosition,
    dayEndSelectionPosition,
    isYearSelected,
    isMonthSelected,
    isDaySelected,
  };
};

const handleNumericKeyDown = (
  target: HTMLInputElement,
  selectionStart: number,
  key: string
) => {
  const {
    year,
    month,
    day,
    yearLength,
    monthLength,
    dayLength,
    yearStartSelectionPosition,
    monthStartSelectionPosition,
    dayStartSelectionPosition,
    yearEndSelectionPosition,
    monthEndSelectionPosition,
    dayEndSelectionPosition,
    isYearSelected,
    isMonthSelected,
    isDaySelected,
  } = getSelectionInfo(target, selectionStart);

  if (isYearSelected) {
    if (yearLength === 4) {
      target.value = [key, month, day].join("-");
      select(target, yearStartSelectionPosition + 1);
    } else {
      target.value = [year + key, month, day].join("-");
      select(target, yearEndSelectionPosition + 1);
    }
  } else if (isMonthSelected) {
    if (monthLength === 2) {
      target.value = [year, key, day].join("-");
      select(target, monthStartSelectionPosition + 1);
    } else {
      target.value = [year, month + key, day].join("-");
      select(target, monthEndSelectionPosition + 1);
    }
  } else if (isDaySelected) {
    if (dayLength === 2) {
      target.value = [year, month, key].join("-");
      select(target, dayStartSelectionPosition + 1);
    } else {
      target.value = [year, month, day + key].join("-");
      select(target, dayEndSelectionPosition + 1);
    }
  }
};

const handleDateInputArrowRight = (
  target: HTMLInputElement,
  selectionStart: number
) => {
  const {
    monthStartSelectionPosition,
    dayStartSelectionPosition,
    monthEndSelectionPosition,
    dayEndSelectionPosition,
    isYearSelected,
    isMonthSelected,
  } = getSelectionInfo(target, selectionStart);

  if (isYearSelected) {
    target.setSelectionRange(
      monthStartSelectionPosition,
      monthEndSelectionPosition
    );
  } else if (isMonthSelected) {
    target.setSelectionRange(
      dayStartSelectionPosition,
      dayEndSelectionPosition
    );
  }
};

const handleDateInputArrowLeft = (
  target: HTMLInputElement,
  selectionStart: number
) => {
  const {
    monthStartSelectionPosition,
    yearStartSelectionPosition,
    monthEndSelectionPosition,
    yearEndSelectionPosition,
    isDaySelected,
    isMonthSelected,
  } = getSelectionInfo(target, selectionStart);

  if (isMonthSelected) {
    target.setSelectionRange(
      yearStartSelectionPosition,
      yearEndSelectionPosition
    );
  } else if (isDaySelected) {
    target.setSelectionRange(
      monthStartSelectionPosition,
      monthEndSelectionPosition
    );
  }
};

const handleDateInputArrowUp = (
  target: HTMLInputElement,
  selectionStart: number,
  calendar: ReturnType<typeof useCalendar>
) => {
  const {
    isYearSelected,
    isMonthSelected,
    isDaySelected,
    yearStartSelectionPosition,
    yearEndSelectionPosition,
    monthStartSelectionPosition,
    dayStartSelectionPosition,
    monthEndSelectionPosition,
    dayEndSelectionPosition,
  } = getSelectionInfo(target, selectionStart);

  if (isYearSelected) {
    const date = calendar.moveYearRight();
    target.value = dayjs(date).format(calendar.format);
    calendar.setDate(date);
    target.setSelectionRange(
      yearStartSelectionPosition,
      yearEndSelectionPosition
    );
  } else if (isMonthSelected) {
    const date = calendar.moveMonthRight();
    target.value = dayjs(date).format(calendar.format);
    calendar.setDate(date);
    target.setSelectionRange(
      monthStartSelectionPosition,
      monthEndSelectionPosition
    );
  } else if (isDaySelected) {
    const date = calendar.moveDayRight();
    target.value = dayjs(date).format(calendar.format);
    calendar.setDate(date);
    target.setSelectionRange(
      dayStartSelectionPosition,
      dayEndSelectionPosition
    );
  }
};

const handleDateInputArrowDown = (
  target: HTMLInputElement,
  selectionStart: number,
  calendar: ReturnType<typeof useCalendar>
) => {
  const {
    isYearSelected,
    isMonthSelected,
    isDaySelected,
    yearStartSelectionPosition,
    yearEndSelectionPosition,
    monthStartSelectionPosition,
    dayStartSelectionPosition,
    monthEndSelectionPosition,
    dayEndSelectionPosition,
  } = getSelectionInfo(target, selectionStart);

  if (isYearSelected) {
    const date = calendar.moveYearLeft();
    target.value = dayjs(date).format(calendar.format);
    calendar.setDate(date);
    target.setSelectionRange(
      yearStartSelectionPosition,
      yearEndSelectionPosition
    );
  } else if (isMonthSelected) {
    const date = calendar.moveMonthLeft();
    target.value = dayjs(date).format(calendar.format);
    calendar.setDate(date);
    target.setSelectionRange(
      monthStartSelectionPosition,
      monthEndSelectionPosition
    );
  } else if (isDaySelected) {
    const date = calendar.moveDayLeft();
    target.value = dayjs(date).format(calendar.format);
    calendar.setDate(date);
    target.setSelectionRange(
      dayStartSelectionPosition,
      dayEndSelectionPosition
    );
  }
};

export const handleKeyDownSelection = (
  e: KeyboardEvent<HTMLInputElement>,
  calendar: ReturnType<typeof useCalendar>
) => {
  const target = e.target as HTMLInputElement;
  target.focus();
  const selectionStart = target.selectionStart || 0;
  const key = e.key;

  if (key >= "0" && key <= "9") {
    handleNumericKeyDown(target, selectionStart, key);
    return;
  }

  if (key === "ArrowRight") {
    e.preventDefault();
    handleDateInputArrowRight(target, selectionStart);
    return;
  }

  if (key === "ArrowLeft") {
    e.preventDefault();
    handleDateInputArrowLeft(target, selectionStart);
    return;
  }

  if (key === "ArrowDown") {
    e.preventDefault();
    handleDateInputArrowDown(target, selectionStart, calendar);
    return;
  }

  if (key === "ArrowUp") {
    e.preventDefault();
    return handleDateInputArrowUp(target, selectionStart, calendar);
  }
};

export const handleMouseSelection = (e: MouseEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  target.focus();
  const selectionStart = target.selectionEnd;
  if (selectionStart === null) return;

  if (selectionStart <= 4) {
    target.setSelectionRange(0, 4);
  } else if (selectionStart <= 7) {
    target.setSelectionRange(5, 7);
  } else if (selectionStart <= 10) {
    target.setSelectionRange(8, 10);
  } else return;
};
