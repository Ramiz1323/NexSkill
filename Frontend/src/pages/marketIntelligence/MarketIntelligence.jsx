import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMarketDemandTrends,
  fetchSkillDistribution,
  fetchMarketSummary,
  setIndustryFilter,
  setRegionFilter,
  setTimeframeFilter,
  clearMarketErrors,
} from '../../redux/slices/marketSlice';
import MarketDemandChart from '../../components/charts/MarketDemandChart';

export default function MarketIntelligence() {
  const dispatch = useDispatch();
  const {
    demandTrends,
    skillDistribution,
    summary,
    filters,
    loading,
    error,
  } = useSelector((state) => state.market);

  useEffect(() => {
    dispatch(fetchMarketDemandTrends(filters));
    dispatch(fetchSkillDistribution(filters));
    dispatch(fetchMarketSummary(filters));
  }, [dispatch, filters]);

  const handleIndustryChange = (e) => {
    dispatch(setIndustryFilter(e.target.value));
  };

  const handleRegionChange = (e) => {
    dispatch(setRegionFilter(e.target.value));
  };

  const handleTimeframeChange = (e) => {
    dispatch(setTimeframeFilter(e.target.value));
  };

  const handleRefresh = () => {
    dispatch(clearMarketErrors());
    dispatch(fetchMarketDemandTrends(filters));
    dispatch(fetchSkillDistribution(filters));
    dispatch(fetchMarketSummary(filters));
  };

  return (
    <div>
      <header>
        <h1>Labour Market Intelligence</h1>
        <p>Real-time labour market demand, hiring trends, and skill distribution analytics.</p>
      </header>

      {/* Filter Controls */}
      <section>
        <h2>Filter Controls</h2>
        <div>
          <label htmlFor="industry-filter">Industry: </label>
          <select
            id="industry-filter"
            value={filters.industry}
            onChange={handleIndustryChange}
          >
            <option value="All">All Industries</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Banking & Finance">Banking & Finance</option>
          </select>

          <label htmlFor="region-filter" style={{ marginLeft: '1rem' }}>Region: </label>
          <select
            id="region-filter"
            value={filters.region}
            onChange={handleRegionChange}
          >
            <option value="All">All Regions</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Telangana">Telangana</option>
          </select>

          <label htmlFor="timeframe-filter" style={{ marginLeft: '1rem' }}>Timeframe: </label>
          <select
            id="timeframe-filter"
            value={filters.timeframe}
            onChange={handleTimeframeChange}
          >
            <option value="1M">Last Month</option>
            <option value="6M">Last 6 Months</option>
            <option value="1Y">Last Year</option>
            <option value="3Y">3 Years</option>
          </select>

          <button
            type="button"
            onClick={handleRefresh}
            style={{ marginLeft: '1rem' }}
          >
            Refresh Data
          </button>
        </div>
      </section>

      {/* Loading and Error Feedback */}
      {loading && <div>Loading labour market data...</div>}
      {error && (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>
          <strong>Error: </strong>
          <span>{error}</span>
          <button
            type="button"
            onClick={() => dispatch(clearMarketErrors())}
            style={{ marginLeft: '0.5rem' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Summary Statistics */}
      <section style={{ marginTop: '1.5rem' }}>
        <h2>Market Summary</h2>
        <div>
          <p>Total Active Postings: {summary?.totalPostings ?? 'N/A'}</p>
          <p>Market Growth Rate: {summary?.growthRate ? `${summary.growthRate}%` : 'N/A'}</p>
          <p>Top In-Demand Role: {summary?.topInDemandRole ?? 'N/A'}</p>
          <p>Top Emerging Skill: {summary?.topEmergingSkill ?? 'N/A'}</p>
        </div>
      </section>

      {/* Market Demand Trend Chart */}
      <section style={{ marginTop: '1.5rem' }}>
        <h2>Demand Volume Trend</h2>
        <MarketDemandChart
          data={demandTrends}
          xKey="period"
          dataKey="demandIndex"
          chartType="area"
        />
      </section>

      {/* Raw Skill Distribution Table */}
      <section style={{ marginTop: '1.5rem' }}>
        <h2>Industry Skill Demand Breakdown</h2>
        {skillDistribution && skillDistribution.length > 0 ? (
          <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Category</th>
                <th>Demand Score</th>
                <th>Year-over-Year Growth</th>
                <th>Urgency Level</th>
              </tr>
            </thead>
            <tbody>
              {skillDistribution.map((item, index) => (
                <tr key={item.id || item.skillName || index}>
                  <td>{item.skillName}</td>
                  <td>{item.category || 'General'}</td>
                  <td>{item.demandScore}</td>
                  <td>{item.yoyGrowth ? `${item.yoyGrowth}%` : 'N/A'}</td>
                  <td>{item.urgencyLevel || 'Standard'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No skill distribution data available.</p>
        )}
      </section>
    </div>
  );
}
