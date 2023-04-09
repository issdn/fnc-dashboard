import type { FC } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from "recharts";
import { cumulativelySumObjectArraysByCategory } from "./chartFunctions";
import { api } from "~/utils/api";
import { colors } from "./utils";

const DataPieChart: FC = () => {
  const { data: expenseData } = api.expense.getAll.useQuery();
  const chartData = cumulativelySumObjectArraysByCategory(
    expenseData || [],
    "amount"
  );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Legend verticalAlign="top" height={48} />
        <Pie
          label={(obj: PieLabelRenderProps) => {
            return (obj.name = (obj.percent || 0).toFixed(2).toString() + "%");
          }}
          fill="#8884d8"
          data={chartData}
          dataKey="amount"
          nameKey="category_name"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DataPieChart;
