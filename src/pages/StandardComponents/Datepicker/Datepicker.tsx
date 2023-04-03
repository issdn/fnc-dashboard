import {
  FC,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import { FieldConfig, useField } from "formik";
import { useVisibility } from "../hooks";
import { useCalendar } from "./hooks";
import {
  handleKeyDownSelection,
  handleMouseSelection,
} from "./datepicker_functions";
import Button from "../Button";
import Icon from "../Icon";

type DatepickerProps = {
  calendar: ReturnType<typeof useCalendar>;
} & JSX.IntrinsicElements["input"] &
  FieldConfig<string>;

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

const Datepicker: FC<DatepickerProps> = ({ calendar, ...props }) => {
  const { isVisible, toggleVisibility } = useVisibility();
  const [field, meta] = useField(props);

  const renderDayButton = (day: number) => {
    const disabled = calendar.reachedMaxDay(day) || calendar.reachedMinDay(day);

    return (
      <button
        type="button"
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
      <div className="relative flex w-full flex-row items-center justify-between rounded-xl">
        <input
          {...field}
          {...props}
          onSelectCapture={(e) => e.preventDefault()}
          onMouseUpCapture={handleMouseSelection}
          onKeyDown={(e) => {
            handleKeyDownSelection(e, calendar);
          }}
          onBlur={(e) => {
            calendar.setDate(e.target.value);
          }}
          onChange={(e) => calendar.setDate(e.target.value)}
          value={calendar.date.format(calendar.format).toString()}
          className="h-full w-full whitespace-nowrap break-keep rounded-xl border-2 border-neutral-900 bg-neutral-100 py-3 text-center font-bold text-neutral-900 outline-none transition-colors duration-300 hover:border-neutral-500 focus:border-blue-600"
        ></input>
        <Button
          attributes={{ type: "button" }}
          onClick={toggleVisibility}
          className="absolute right-2 flex flex-row items-center gap-x-2 rounded-xl px-4 focus:bg-neutral-900/10 enabled:hover:bg-neutral-900/10 disabled:cursor-default disabled:text-neutral-700"
        >
          <Icon className="my-0.5 text-neutral-900" icon="calendar_month" />
        </Button>
      </div>
      <div className="relative w-full">
        <div className="absolute z-50 w-full">
          {!isVisible ? null : (
            <div className="flex w-full flex-col items-center gap-y-3 rounded-xl bg-neutral-900 py-2 px-1">
              <div className="flex w-[70%] flex-row items-center justify-between">
                <Button
                  className="h-fit rounded-full enabled:hover:bg-neutral-700 disabled:cursor-default disabled:text-neutral-500"
                  onClick={() => calendar.setDate(calendar.moveMonthLeft())}
                  attributes={{
                    disabled: calendar.reachedMinMonth(
                      calendar.date.month() - 2
                    ),
                    type: "button",
                  }}
                >
                  <Icon className="mx-1 text-2xl md:mx-0" icon="chevron_left" />
                </Button>
                <div className="flex flex-col items-center">
                  <p className=" text-xl font-bold">
                    {MONTH_NAMES[calendar.date.month()]}
                  </p>
                  <p className=" -mt-2">{calendar.date.year()}</p>
                </div>
                <Button
                  className="disabled:hover-none h-fit rounded-full enabled:hover:bg-neutral-700 disabled:cursor-default disabled:text-neutral-500"
                  onClick={() => calendar.setDate(calendar.moveMonthRight())}
                  attributes={{
                    disabled: calendar.reachedMaxMonth(
                      calendar.date.month() + 2
                    ),
                    type: "button",
                  }}
                >
                  <Icon
                    className="mx-1 text-2xl md:mx-0"
                    icon="chevron_right"
                  />
                </Button>
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
