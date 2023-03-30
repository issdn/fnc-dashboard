export const filterObjectsArray = <
  T extends Record<string, string | number | boolean>
>(
  value: string,
  data: T[],
  key: string
): Promise<T[]> => {
  return new Promise((resolve) =>
    resolve(
      data.filter((item: T) =>
        item[key]?.toString().toLowerCase().includes(value)
      )
    )
  );
};
