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

type DataObject = {
  date: dayjs.Dayjs;
} & {
  [x: string]: number;
};
type BaseData = { date: Date | string | Dayjs; amount: number }[];
export const cumulativeSumByDateOnOrderedArray = <
  TKey extends string,
  TData extends BaseData
>(
  data: TData,
  key: TKey,
  date: string | Date | Dayjs = "2023-04-02T22:00:00.000Z"
) => {
  const monthDaysArray = getDaysInMonthArray(date);

  const result: DataObject[] = [];

  let startAt = 0;
  let lastSummedAmount = 0;

  monthDaysArray.forEach((day) => {
    const obj: DataObject = {
      date: day,
      [key]: lastSummedAmount,
    } as DataObject;

    for (let i = startAt; i < data.length; i++) {
      if (dayjs(data[i]?.date).isSame(day, "day")) {
        if (data[i]) {
          (obj[key] as number) += data[i]?.amount ?? 0;
        }
        lastSummedAmount = obj[key] as number;
      } else {
        startAt = i;
        break;
      }
    }
    result.push(obj);
  });
  return result;
};

export const combineCumulativeSummedArrays = <TData extends DataObject>(
  dataArrays: TData[][]
) => {
  return (
    dataArrays[0]?.map((_, index) => {
      const obj = {};
      dataArrays.forEach((data) => {
        Object.assign(obj, data[index]);
      });
      return obj as TData;
    }) ?? []
  );
};

export const findLongestArray = <T>(arr: T[][]) =>
  arr.reduce((p, n) => (n.length > p.length ? n : p));
