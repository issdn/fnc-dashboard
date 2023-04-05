import type { TableData } from "../StandardComponents/FilteredTable";

export const filterObjectsArray = <TData extends TableData>(
  value: string,
  data: TData[],
  key: keyof TData
): Promise<TData[]> => {
  return new Promise((resolve) =>
    resolve(
      data.filter((item) => item[key]?.toString().toLowerCase().includes(value))
    )
  );
};
