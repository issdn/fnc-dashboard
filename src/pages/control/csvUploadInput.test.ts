import { expect, test } from "vitest";
import { parseCsvFile } from "./csvUploadManager";
import { z } from "zod";

const testCsv = `date,name,amount
2023-04-01, Groceries, 200.0
2023-04-01, Rent, 1000.0
2023-04-02, Gasoline, 50.0`;

test("parsing csv", () => {
  const parsed = parseCsvFile(
    testCsv,
    z.object({ date: z.string(), name: z.string(), amount: z.string() })
  );
  expect(parsed).toEqual([
    { date: "2023-04-01", name: "Groceries", amount: "200.0" },
    { date: "2023-04-01", name: "Rent", amount: "1000.0" },
    { date: "2023-04-02", name: "Gasoline", amount: "50.0" },
  ]);
});
