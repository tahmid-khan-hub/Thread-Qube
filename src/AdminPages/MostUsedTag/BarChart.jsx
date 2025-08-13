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
      <ReBarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tag" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} /> 
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
