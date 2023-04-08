import dayjs, { type Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const cumulativeSum = (arr: number[]) => {
  const sum = [];
  arr.reduce((prev, curr) => {
    const next = prev + curr;
    sum.push(next);
    return next;
  }, 0);
};

export const getDaysInMonthArray = (date: string | Date | Dayjs) => {
  const currentDate = dayjs.utc(date).startOf("month");
  const daysInMonth = currentDate.daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) =>
    currentDate.set("date", i + 1)
  );
};

type BaseDataType = { date: Date | string; amount: number }[];
export const cumulativeSumByDateOnOrderedArray = <
  TKey extends string,
  TData extends BaseDataType
>(
  data: TData,
  key: TKey,
  date: string | Date | Dayjs = "2023-04-02T22:00:00.000Z"
) => {
  const monthDaysArray = getDaysInMonthArray(date);
  type Data = Record<TKey, number> & { date: Dayjs };

  const result: Data[] = [];

  let startAt = 0;
  let lastSummedAmount = 0;
  monthDaysArray.forEach((day) => {
    const obj: Data = {
      date: day,
      [key]: lastSummedAmount,
    } as Data;
    for (let i = startAt; i < data.length; i++) {
      if (dayjs(data[i]?.date).isSame(day, "day")) {
        if (data[i]) {
          (obj[key] as number) += data[i]?.amount ?? 0;
        }
        lastSummedAmount = obj[key];
      } else {
        startAt = i;
        break;
      }
    }
    result.push(obj);
  });
  return result;
};

export const combineCumulativeSummedArrays = <
  TData extends Record<string, number> & { date: Dayjs | string | Date }[]
>(
  dataArrays: TData[]
) => {
  return dataArrays[0]?.map((item, index) => {
    const obj = {};
    dataArrays.forEach((data) => {
      Object.assign(obj, data[index]);
    });
    return obj;
  });
};

export const findLongestArray = <T>(arr: T[][]) =>
  arr.reduce((p, n) => (n.length > p.length ? n : p));
