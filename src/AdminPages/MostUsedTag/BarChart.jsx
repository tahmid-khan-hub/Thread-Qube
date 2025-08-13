import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={data} layout="vertical" margin={{ top: 20, right: 20, left: 40, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="tag" type="category" />
        <Tooltip />
        <Bar dataKey="count" fill="#4F46E5" radius={[0, 8, 8, 0]} />
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;