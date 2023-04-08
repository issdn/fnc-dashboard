import { expect, test } from "vitest";
import { readCsvFile } from "./csvReader";
import { z } from "zod";
import dayjs from "dayjs";

const testCsv = `date,name,amount
2023-04-01, Groceries, 200.0
2023-04-01, Rent, 1000.50
2023-04-02, Gasoline, 50.23`;

test("parsing csv", () => {
  const parsed = readCsvFile(
    testCsv,
    z.object({
      date: z.string().transform((arg) => dayjs(arg).format("YYYY-MM-DD")),
      name: z.string(),
      amount: z.string().transform((arg) => Number(arg)),
    })
  );
  expect(parsed).toEqual([
    { date: "2023-04-01", name: "Groceries", amount: 200 },
    { date: "2023-04-01", name: "Rent", amount: 1000.5 },
    { date: "2023-04-02", name: "Gasoline", amount: 50.23 },
  ]);
});
