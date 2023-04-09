import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useSettings } from "../settingsContext";
import {
  type BaseData,
  combineCumulativeSummedArrays,
  cumulativeSumByDateOnOrderedArray,
} from "./chartFunctions";
import type { Flatten } from "./utilTypes";
import { useCallback } from "react";
import { colors } from "./utils";

type StackedAreaChartProps<TData> = {
  data: { [k: string]: TData };
};

const StackedAreaChart = <TData extends BaseData>({
  data,
}: StackedAreaChartProps<TData>) => {
  const { dateFormat } = useSettings();

  let keys = Object.keys(data);
  if (keys.length > colors.length) {
    throw new Error(
      `You have too many data sets to render. You have ${keys.length} data sets but only ${colors.length} colors.`
    );
  }

  const useChartData = useCallback(
    () =>
      combineCumulativeSummedArrays(
        Object.entries(data).map(([key, data]) =>
          cumulativeSumByDateOnOrderedArray(data, key)
        )
      ),
    [data]
  );

  const chartData = useChartData();

  keys = keys
    .map((k) => ({
      value:
        (chartData[chartData.length - 1] as Flatten<typeof chartData>)[k] ?? 0,
      key: k,
    }))
    .sort((a, b) => b.value - a.value)
    .map(({ key }) => key)
    .reverse();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {keys.map((key, i) => (
            <linearGradient
              key={key}
              id={"gradient" + key}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="15%"
                stopColor={colors?.[i]?.[0]}
                stopOpacity={0.8}
              />
              <stop
                offset="85%"
                stopColor={colors?.[i]?.[1]}
                stopOpacity={0.4}
              />
            </linearGradient>
          ))}
        </defs>
        <XAxis
          dataKey={(obj: Flatten<typeof chartData>) =>
            obj.date.format(dateFormat)
          }
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={48} />
        {keys.map((key, i) => (
          <Line
            strokeWidth={4}
            name={key}
            key={i}
            type="monotone"
            dataKey={key}
            stroke={colors?.[i]}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaChart;
