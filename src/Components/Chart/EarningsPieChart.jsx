import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

export default function EarningsPieChart() {
  const data = [
    { name: "Done", value: 45 },
    { name: "Left", value: 25 },
    { name: "In Progress", value: 30 },
  ];

  const COLORS = {
    Done: "#0259A9",
    "In Progress": "#3598F1",
    Left: "#B1D7FA",
  };

  const totalValue = 38;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={[{ name: "Center", value: 1 }]}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#ffffff"
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={75}
          outerRadius={90}
          labelLine={false}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
          ))}
          {/* Centered Percentage Text */}
          <Label
            value={`${totalValue}%`}
            position="center" // Ensures the label is centered
            fontSize="24px"
            fontWeight="bold"
            fill="#333"
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
