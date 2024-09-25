import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
  { name: "May", uv: 1890, pv: 4800 },
  { name: "Jun", uv: 2390, pv: 3800 },
  { name: "Jul", uv: 3490, pv: 4300 },
  { name: "Aug", uv: 4000, pv: 2400 },
  { name: "Sep", uv: 3000, pv: 1398 },
  { name: "Oct", uv: 2000, pv: 9800 },
  { name: "Nov", uv: 2780, pv: 3908 },
  { name: "Dec", uv: 1890, pv: 4800 },
];

export default function UserRatioChart() {
  const [focusBar, setFocusBar] = useState(null);

  return (
    <div style={{ width: "100%", height: 300 }}>
      {/* Ensure the parent div has width and height defined */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              setFocusBar(state.activeTooltipIndex);
            } else {
              setFocusBar(null);
            }
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="pv" barSize={10} radius={[16, 16, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={focusBar === index ? "#4bc4f7" : "#8bc4f7"}
              />
            ))}
          </Bar>
          <Bar dataKey="uv" barSize={10} radius={[16, 16, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={focusBar === index ? "#102190" : "#013564"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
