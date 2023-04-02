import { FC } from "react";
import { filterObjectsArray } from "./table_functions";

type FilteredTableProps = {
  data: Record<string, any>[];
  setData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  children: React.ReactNode | React.ReactNode[];
  filterKey: string;
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
      <div className="h-full w-full overflow-auto rounded-br-2xl rounded-bl-2xl bg-neutral-900 pb-4 text-xs text-neutral-100 sm:text-sm md:pb-8 md:text-xl">
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
