import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

// Dummy data for charts
const dataBar = [
  { name: "MON", total: 8, ongoing: 5 },
  { name: "TUE", total: 9, ongoing: 6 },
  { name: "WED", total: 7, ongoing: 4 },
  { name: "THU", total: 8, ongoing: 5 },
  { name: "FRI", total: 9, ongoing: 7 },
  { name: "SAT", total: 7, ongoing: 3 },
  { name: "SUN", total: 8, ongoing: 5 },
];

const dataLine = [
  { name: "SAT", value: 20 },
  { name: "SUN", value: 2 },
  { name: "MON", value: 50 },
  { name: "TUE", value: 5 },
  { name: "WED", value: 75 },
  { name: "THU", value: 22 },
  { name: "FRI", value: 13 },
];

// InfoCard Component
export const InfoCard = ({ title, value, color }) => {
  // SVG for the fat arrow
  const fatArrowSvg = (fillColor) =>
    `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cpolygon fill="${encodeURIComponent(
      fillColor
    )}" points="0,0 100,0 50,50 100" /%3E%3C/svg%3E')`;

  return (
    <div
      className={`relative rounded-lg p-6 shadow-lg overflow-hidden ${color}`}
      style={{
        // Top-right arrow
        backgroundImage: `${fatArrowSvg(
          "rgba(255, 255, 255, 0.1)"
        )}, ${fatArrowSvg("rgba(255, 255, 255, 0.1)")}`,
        backgroundSize: "80px 80px, 80px 80px",
        backgroundPosition: "top right, bottom left", // Position arrows
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white">{value}</h2>
        <p className="text-lg text-white mt-2">{title}</p>
      </div>
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={dataLine}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Bar Chart Component for Task Overview
export const TaskOverviewBarChart = () => (
  <div className="bg-[#F5F9FE] rounded-lg">
    <ResponsiveContainer width="100%" height={385}>
      <BarChart data={dataBar} barGap={0}>
        {/* <CartesianGrid /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="total"
          barSize={10}
          fill="#3399ff"
          radius={[16, 16, 0, 0]}
        />
        <Bar
          dataKey="ongoing"
          barSize={10}
          fill="#8095a9"
          radius={[16, 16, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Line Chart Component for Income Overview
export const IncomeLineChart = () => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={385}>
        <AreaChart
          data={dataLine}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          {/* Adding Cartesian Grid for better visualization */}
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />

          <XAxis
            dataKey="name"
            tickMargin={10}
            axisLine={false} // Remove X axis line for a cleaner look
          />
          <YAxis
            tickMargin={10}
            axisLine={false} // Remove Y axis line for a cleaner look
          />

          {/* Defining Gradient */}
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3399ff" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Tooltip with custom formatting */}
          <Tooltip
            formatter={(value) => [`${value}K`, "Income"]}
            labelFormatter={(label) => `Day: ${label}`}
            contentStyle={{
              backgroundColor: "#3399ff",
              borderColor: "#000",
              color: "#FFF",
            }} // Custom styling
            itemStyle={{ color: "#FFF" }}
          />

          {/* Area with gradient fill */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3399ff"
            fill="url(#colorUv)" // Applying the gradient here
            strokeWidth={3}
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
