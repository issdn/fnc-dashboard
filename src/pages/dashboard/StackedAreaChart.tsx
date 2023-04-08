import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
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

type StackedAreaChartProps<TData> = {
  data: { [k: string]: TData };
};

const gradients = [
  ["#654ea3", "#eaafc8"],
  ["#f12711", "#f5af19"],
  ["#2193b0", "#6dd5ed"],
  ["#cc2b5e", "#753a88"],
  ["#8E2DE2", "#4A00E0"],
  ["#59C173", "#5D26C1"],
  ["#D3CCE3", "#E9E4F0"],
];

const StackedAreaChart = <TData extends BaseData>({
  data,
}: StackedAreaChartProps<TData>) => {
  const { dateFormat } = useSettings();

  let keys = Object.keys(data);
  if (keys.length > gradients.length) {
    throw new Error(
      `You have too many data sets to render. You have ${keys.length} data sets but only ${gradients.length} gradients.`
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
      <AreaChart
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
                stopColor={gradients?.[i]?.[0]}
                stopOpacity={0.6}
              />
              <stop
                offset="85%"
                stopColor={gradients?.[i]?.[1]}
                stopOpacity={0.6}
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
          <Area
            key={i}
            type="monotone"
            stackId="1"
            dataKey={key}
            stroke={gradients?.[i]?.[0]}
            fillOpacity={1}
            fill={`url(#gradient${key})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaChart;
