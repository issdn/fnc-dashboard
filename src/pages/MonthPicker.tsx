import { type FC } from "react";
import { type useCalendar } from "./StandardComponents/Datepicker/datepicker_hooks";
import { MONTH_NAMES } from "./StandardComponents/Datepicker/datepicker_functions";
import Button from "./StandardComponents/Button";
import dayjs from "dayjs";

type MonthPickerProps = {
  calendar: ReturnType<typeof useCalendar>;
};

const MonthPicker: FC<MonthPickerProps> = ({ calendar }) => {
  return (
    <div className="relative z-10">
      <div className="absolute flex flex-row gap-x-2 rounded-xl bg-neutral-900 py-4 px-2 text-neutral-100">
        <div className="flex flex-col items-center gap-y-1">
          <label htmlFor="dateMonth" className={`w-24 text-center font-bold`}>
            {MONTH_NAMES[calendar.date.month()]}
          </label>
          <div className="mt-2 flex flex-col items-center gap-y-1">
            <Button
              onClick={() => calendar.setDate(calendar.moveMonthLeft())}
              type="primary"
              className="text-neutral-500"
            >
              {MONTH_NAMES[dayjs(calendar.moveMonthLeft()).month()]}
            </Button>
            <Button type="primary">{MONTH_NAMES[calendar.date.month()]}</Button>
            <Button
              onClick={() => calendar.setDate(calendar.moveMonthRight())}
              type="primary"
              className="text-neutral-500"
            >
              {MONTH_NAMES[dayjs(calendar.moveMonthRight()).month()]}
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-1">
          <label htmlFor="dateYear" className="font-bold">
            {calendar.date.year()}
          </label>
          <div className="mt-2 flex flex-col items-center gap-y-1">
            <Button type="primary" className="text-neutral-500">
              {calendar.date.year() - 1}
            </Button>
            <Button type="primary">{calendar.date.year()}</Button>
            <Button type="primary" className="text-neutral-500">
              {calendar.date.year() + 1}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthPicker;
