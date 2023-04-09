import { expect, test } from "vitest";
import {
  type DataObject,
  combineCumulativeSummedArrays,
  cumulativeSumByDateOnOrderedArray,
  cumulativelySumObjectArraysByCategory,
} from "./chartFunctions";
import {
  testExpenseIncomeCombinedDataExpected,
  testExpensesData,
  testExpensesDataExpected,
  testIncomeDataExpected,
} from "./testData";

test("correctly cumulatively sums values by date", () => {
  expect(
    cumulativeSumByDateOnOrderedArray(testExpensesData, "expense").map((i) => {
      return { ...i, date: i.date.format("YYYY-MM-DD") };
    })
  ).toEqual(testExpensesDataExpected);
});

test("correctly combines two cumulatively summed data arrays", () => {
  expect(
    combineCumulativeSummedArrays([
      testIncomeDataExpected as unknown as DataObject[],
      testExpensesDataExpected as unknown as DataObject[],
    ])
  ).toEqual(testExpenseIncomeCombinedDataExpected);
});

test("correctly cumulatively summs object values by category", () => {
  expect(
    cumulativelySumObjectArraysByCategory(testExpensesData, "amount")
  ).toEqual([
    { category_name: "qq", amount: 1200 },
    { category_name: "aa", amount: 50 },
  ]);
});
