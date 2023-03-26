import {
  FC,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import IconButton from "../../IconButton";
import { useVisibility } from "../hooks";
import { useCalendar } from "./hooks";
import { handleKeyDownSelection, handleMouseSelection } from "./functions";
import Dateinput from "./Dateinput";

type DatepickerProps = {
  calendar: ReturnType<typeof useCalendar>;
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "June",
  "July",
  "May",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Datepicker: FC<DatepickerProps> = ({ calendar }) => {
  const { isVisible, toggleVisibility } = useVisibility();

  const renderDayButton = (day: number) => {
    const disabled = calendar.reachedMaxDay(day) || calendar.reachedMinDay(day);

    return (
      <button
        onClick={() => calendar.setDay(day)}
        key={day}
        className="flex h-11 w-11 flex-row items-center justify-center rounded-xl text-xl enabled:hover:bg-neutral-700 disabled:text-neutral-500"
        disabled={disabled}
      >
        <p>{day + 1}</p>
      </button>
    );
  };

  const MonthDays = () => {
    return (
      <div className="grid w-full grid-cols-7 place-content-center place-items-center gap-x-1 gap-y-1">
        {Array.from(Array(calendar.date.daysInMonth()).keys()).map(
          (day: number) => renderDayButton(day)
        )}
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col gap-y-2 text-neutral-100 sm:w-80">
      <div className="flex w-full flex-row items-center justify-between gap-x-2 rounded-xl bg-neutral-900 px-8 py-1">
        <Dateinput calendar={calendar} />
        <IconButton
          onClick={toggleVisibility}
          icon="calendar_month"
          className="flex flex-row items-center gap-x-2 rounded-xl px-4 enabled:hover:bg-neutral-700 disabled:cursor-default disabled:text-neutral-500"
        />
      </div>
      <div className="relative w-full">
        <div className="absolute z-50 w-full">
          {!isVisible ? null : (
            <div className="flex w-full flex-col items-center gap-y-3 rounded-xl bg-neutral-900 py-2 px-1">
              <div className="flex w-[70%] flex-row items-center justify-between">
                <IconButton
                  icon="chevron_left"
                  className="h-fit rounded-full enabled:hover:bg-neutral-700 disabled:cursor-default disabled:text-neutral-500"
                  onClick={() => calendar.setDate(calendar.moveMonthLeft())}
                  attributes={{
                    disabled: calendar.reachedMinMonth(
                      calendar.date.month() - 2
                    ),
                  }}
                  iconClassName="text-2xl mx-1"
                />
                <div className="flex flex-col items-center">
                  <p className=" text-xl font-bold">
                    {MONTH_NAMES[calendar.date.month()]}
                  </p>
                  <p className=" -mt-2">{calendar.date.year()}</p>
                </div>
                <IconButton
                  icon="chevron_right"
                  className="disabled:hover-none h-fit rounded-full enabled:hover:bg-neutral-700 disabled:cursor-default disabled:text-neutral-500"
                  onClick={() => calendar.setDate(calendar.moveMonthRight())}
                  attributes={{
                    disabled: calendar.reachedMaxMonth(
                      calendar.date.month() + 2
                    ),
                  }}
                  iconClassName="text-2xl mx-1"
                />
              </div>
              <div className="w-full px-2">
                <div className="w-full border-t border-white" />
              </div>
              <MonthDays />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Datepicker;
