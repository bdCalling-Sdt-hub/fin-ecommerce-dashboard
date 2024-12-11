/* eslint-disable react/prop-types */
import { LineChart, Line, ResponsiveContainer } from "recharts";

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
      className={`relative rounded-lg p-6 h-52 w-[500px] shadow-lg overflow-hidden ${color}`}
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
