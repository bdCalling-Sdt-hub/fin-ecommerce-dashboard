import React from "react";
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAllEarningsQuery } from "../../Redux/api/dashboardApi";

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

const Bar_Chart = ({earningYear}) => {

  const {data} = useGetAllEarningsQuery(earningYear);
  // console.log('====== bar chart', data?.data);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const convertData = data?.data?.map(item => ({
    month: monthNames[item.month - 1],
    totalIncome: item.totalIncome
  }));


  
  const yAxisTickFormatter = (value) => `${value}K`;

  // Custom tick style
  const tickStyle = { fill: "black" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={convertData}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={30} // Adjust the gap between bars if necessary
        >
          <XAxis dataKey="month" tick={{ ...tickStyle }} tickMargin={6} />
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
            dataKey="totalIncome"
            fill="#BBB69A" // Bar color
            barSize={20} // Width of each bar
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;