import React from "react";
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", uv: 80 },
  { name: "Feb", uv: 70 },
  { name: "Mar", uv: 50 },
  { name: "Apr", uv: 60 },
  { name: "May", uv: 30 },
  { name: "Jun", uv: 20 },
  { name: "Jul", uv: 45 },
  { name: "Aug", uv: 36 },
  { name: "Sep", uv: 53 },
  { name: "Oct", uv: 69 },
  { name: "Nov", uv: 78 },
  { name: "Dec", uv: 36 },
];

const Bar_Chart = () => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}K`;

  // Custom tick style
  const tickStyle = { fill: "black" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={30} // Adjust the gap between bars if necessary
        >
          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            axisLine={{
              stroke: "#BBB69A", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />
          <ReferenceLine y={20} stroke="#BBB69A" strokeWidth={1} />
          <ReferenceLine y={40} stroke="#BBB69A" strokeWidth={1} />
          <ReferenceLine y={60} stroke="#BBB69A" strokeWidth={1} />
          <ReferenceLine y={80} stroke="#BBB69A" strokeWidth={1} />
          <ReferenceLine y={100} stroke="#BBB69A" strokeWidth={1} />
          <Bar
            dataKey="uv"
            fill="#BBB69A" // Bar color
            barSize={20} // Width of each bar
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;