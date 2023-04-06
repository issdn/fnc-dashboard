import dayjs from "dayjs";
import { type FC } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "~/utils/api";
import { useSettings } from "../settingsContext";
import { type Expense } from "@prisma/client";

const ExpenseCharts: FC = () => {
  const { data } = api.expense.getAll.useQuery();
  const { dateFormat } = useSettings();

  const chartData = data?.map((exp) => ({
    date: dayjs(exp.date).format(dateFormat),
    amount: exp.amount,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#654ea3" stopOpacity={0.6} />
            <stop offset="85%" stopColor="#eaafc8" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis dataKey="amount" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#gradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ExpenseCharts;
