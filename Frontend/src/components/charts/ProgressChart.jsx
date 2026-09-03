import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const ProgressChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="progress-chart-empty text-center p-8 border rounded text-gray-500">
        No skill progress analytics data available yet.
      </div>
    );
  }

  // Format data keys if needed
  const chartData = data.map((item) => ({
    name: item.skill || item.name || 'Skill',
    proficiency: typeof item.proficiency === 'number' ? item.proficiency : item.progress || 0,
  }));

  return (
    <div className="progress-chart-container w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip formatter={(value) => [`${value}%`, 'Proficiency']} />
          <Bar dataKey="proficiency" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
