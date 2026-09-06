import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function MarketDemandChart({
  data = [],
  xKey = 'period',
  dataKey = 'demandIndex',
  chartType = 'area',
}) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-xs text-slate-400">
        No market demand signals available for the selected filters.
      </div>
    );
  }

  // Format data to ensure required fields exist
  const formattedData = data.map((d) => ({
    ...d,
    [xKey]: d[xKey] || d.role || d.jobRole || d.period || 'Period',
    [dataKey]: typeof d[dataKey] === 'number' ? d[dataKey] : (d.hiringVolume || d.openPositions || d.growthRatePercentage || 100),
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="marketDemandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey={xKey}
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px',
            }}
            formatter={(val) => [`${val} Index`, 'Demand Velocity']}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#4f46e5"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#marketDemandGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
