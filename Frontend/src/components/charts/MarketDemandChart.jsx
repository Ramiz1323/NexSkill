import React from 'react';

export default function MarketDemandChart({ data = [] }) {
  if (!data || data.length === 0) {
    return <div>No market demand data available.</div>;
  }
  return <div>[Market Demand Chart: {data.length} records]</div>;
}
