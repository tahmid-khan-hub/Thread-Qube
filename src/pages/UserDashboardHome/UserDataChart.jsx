import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const UserDataChart = ({ stats }) => {
  const data = [
    { name: "Posts", value: stats.totalPosts || 0 },
    { name: "Likes", value: stats.totalLikes || 0 },
    { name: "Comments", value: stats.totalComments || 0 }
  ];

  const colors = ["#ff6f3c", "#ff914d", "#ffb347"];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-16">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Your Activity Overview
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          />
          <Legend verticalAlign="bottom" height={36} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDataChart;
