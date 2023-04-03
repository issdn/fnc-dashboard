import type { FC } from "react";
import { filterObjectsArray } from "./table_functions";

type FilteredTableProps = {
  data: Record<string, any>[];
  setData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  children: React.ReactNode | React.ReactNode[];
  filterKey: string;
};

const handleTableKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if ((e.target as HTMLDivElement).nodeName !== "DIV") return;
  const tableBody = e.currentTarget.getElementsByTagName("tbody")[0];
  if (!tableBody) return;
  if (e.key === "ArrowDown") {
    const trs = tableBody.getElementsByTagName("tr");
    if (trs.length > 0) {
      console.log(trs[0]);
      (trs[0] as HTMLTableRowElement).focus();
    }
  } else if (e.key === "ArrowUp") {
    const trs = tableBody.getElementsByTagName("tr");
    if (trs.length > 0) {
      (trs[trs.length - 1] as HTMLTableRowElement).focus();
    }
  }
};

const FilteredTable: FC<FilteredTableProps> = ({
  data,
  setData,
  children,
  filterKey,
}) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="rounded-tr-2xl rounded-tl-2xl bg-neutral-900 px-8 py-4">
        <input
          onChange={(e) => {
            filterObjectsArray(e.target.value, data, filterKey)
              .then((newData) => setData(newData))
              .catch(() => setData(data));
          }}
          className="input-util w-full rounded-xl bg-neutral-900 py-1 px-4 text-neutral-200"
          placeholder="Search..."
        />
      </div>
      <div
        onKeyDown={handleTableKeyDown}
        className="h-full w-full overflow-auto rounded-br-2xl rounded-bl-2xl bg-neutral-900 pb-4 text-xs text-neutral-100 sm:text-sm md:pb-8 md:text-xl"
      >
        <table
          summary="Categories table with monthly tresholds."
          className="w-full text-center"
        >
          {children}
        </table>
      </div>
    </div>
  );
};

export default FilteredTable;
