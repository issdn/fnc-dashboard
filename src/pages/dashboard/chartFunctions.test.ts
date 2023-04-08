import { expect, test } from "vitest";
import {
  combineCumulativeSummedArrays,
  cumulativeSumByDateOnOrderedArray,
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

test("correctly combines two cumulattively summed data arrays", () => {
  expect(
    combineCumulativeSummedArrays([
      testIncomeDataExpected,
      testExpensesDataExpected,
    ])
  ).toEqual(testExpenseIncomeCombinedDataExpected);
});
