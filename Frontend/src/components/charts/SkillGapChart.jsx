import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function SkillGapChart({
  data = [],
  chartType = 'radar',
  skillKey = 'skill',
  requiredKey = 'required',
  currentKey = 'current',
}) {
  if (!data || data.length === 0) {
    return <div>No skill gap data available.</div>;
  }

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'bar' ? (
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={skillKey} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey={requiredKey} name="Target Required" fill="#2563eb" />
            <Bar dataKey={currentKey} name="Current Competency" fill="#10b981" />
          </BarChart>
        ) : (
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={skillKey} />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar
              name="Target Required"
              dataKey={requiredKey}
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.4}
            />
            <Radar
              name="Current Competency"
              dataKey={currentKey}
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.4}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
