import { type FC } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { api } from "~/utils/api";
import { useSettings } from "../settingsContext";
import {
  combineCumulativeSummedArrays,
  cumulativeSumByDateOnOrderedArray,
} from "./chartFunctions";
import dayjs from "dayjs";
import type { Expense, Income } from "@prisma/client";

type Flatten<T> = T extends Array<infer U> ? U : never;

const ExpenseCharts: FC = () => {
  const { data: expenseData } = api.expense.getAll.useQuery();
  const { data: incomeData } = api.income.getHistory.useQuery();
  const { dateFormat } = useSettings();

  const chartData = combineCumulativeSummedArrays([
    cumulativeSumByDateOnOrderedArray<"expense", Expense[]>(
      expenseData || [],
      "expense",
      dayjs()
    ),
    cumulativeSumByDateOnOrderedArray<"income", Income[]>(
      incomeData || [],
      "income",
      dayjs()
    ),
  ]);

  console.log(chartData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="gradientExpense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#654ea3" stopOpacity={0.6} />
            <stop offset="85%" stopColor="#eaafc8" stopOpacity={0.6} />
          </linearGradient>
          <linearGradient id="gradientIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#f12711" stopOpacity={0.6} />
            <stop offset="85%" stopColor="#f5af19" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={(obj: Flatten<typeof chartData>) =>
            obj.date.format(dateFormat)
          }
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          stackId="1"
          dataKey="income"
          stroke="#f5af19"
          fillOpacity={1}
          fill="url(#gradientIncome)"
        />
        <Area
          type="monotone"
          dataKey="expense"
          stroke="#8884d8"
          fillOpacity={1}
          stackId="1"
          fill="url(#gradientExpense)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ExpenseCharts;
