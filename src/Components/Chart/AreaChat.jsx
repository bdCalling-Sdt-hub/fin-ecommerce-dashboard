/* eslint-disable no-unused-vars */
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTotalUsersRasioQuery } from "../../Redux/api/usersApi";





const data = [
  { month: "Jan", userCount: 5 },
  { month: "Feb", userCount: 8 },
  { month: "Mar", userCount: 5 },
  { month: "Apr", userCount: 55 },
  { month: "May", userCount: 5 },
  { month: "Jun", userCount: 5 },
  { month: "Jul", userCount: 6 },
  { month: "Aug", userCount: 9 },
  { month: "Sep", userCount: 5 },
  { month: "Oct", userCount: 5 },
  { month: "Nov", userCount: 8 },
  { month: "Dec", userCount: 7 },
];

const Area_Chart = ({year}) => {

  const {data} = useTotalUsersRasioQuery(year);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const convertData = data?.data.map(item => ({
    month: monthNames[item.month - 1],
    userCount: item.userCount
  }));

  // console.log('convertData ', convertData);
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  return (
    <div className="w-full h-80 ">
      <ResponsiveContainer >
        <AreaChart
          data={convertData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <XAxis dataKey="month" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            tickMargin={16}
          />
          <defs>
            <linearGradient id="colorName" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#BBB69A66" stopOpacity={1} />
              <stop offset="60%" stopColor="#3E340166" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip
            formatter={(value, month, props) => [`${value}K`, "income"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="userCount"
            stroke=""
            fill="url(#colorName)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Area_Chart;