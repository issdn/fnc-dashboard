import { FC, useEffect, useRef } from "react";
import { useCalendar } from "./hooks";
import { handleKeyDownSelection, handleMouseSelection } from "./functions";

type DateinputProps = {
  calendar: ReturnType<typeof useCalendar>;
};

const Dateinput: FC<DateinputProps> = ({ calendar }) => {
  return (
    <div>
      <input
        onSelectCapture={(e) => e.preventDefault()}
        onMouseUpCapture={handleMouseSelection}
        onKeyDown={(e) => {
          handleKeyDownSelection(e, calendar);
        }}
        onBlur={(e) => {
          calendar.setDate(e.target.value);
        }}
        onChange={(e) => calendar.setDate(e.target.value)}
        value={calendar.date.format("YYYY-MM-DD").toString()}
        className="cursor-default whitespace-nowrap break-keep bg-neutral-900 text-center focus:outline-neutral-100"
      ></input>
    </div>
  );
};

export default Dateinput;
