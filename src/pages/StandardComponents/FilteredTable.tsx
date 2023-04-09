import { useState, useEffect } from "react";
import { filterObjectsArray } from "../control/table_functions";

export type TableData = Record<string, string | number | Date | boolean>;

type FilteredTableProps<TData extends TableData> = {
  data: TData[];
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  children: React.ReactNode | React.ReactNode[];
  filterKey: keyof TData;
  title: string;
};

export const useFilteredTableData = <TData extends TableData>(
  data: TData[]
) => {
  const [filteredData, setFilteredData] = useState<TData[]>(data);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  return { data: filteredData, setData: setFilteredData };
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

const FilteredTable = <TData extends TableData>({
  data,
  setData,
  children,
  filterKey,
  title,
}: FilteredTableProps<TData>) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="top-0 left-0 h-full w-full xl:absolute">
        <div className="flex h-full w-full flex-col">
          <div className="flex flex-row items-center rounded-tr-2xl rounded-tl-2xl bg-neutral-900 px-8 py-4">
            <h1 className="px-2 font-bold capitalize text-neutral-100">
              {title}
            </h1>
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
      </div>
    </div>
  );
};

export default FilteredTable;
