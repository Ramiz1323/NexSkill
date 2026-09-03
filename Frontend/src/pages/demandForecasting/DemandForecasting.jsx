import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSkillForecast,
  fetchEmergingRoles,
  fetchAutomationAnalysis,
  setForecastHorizon,
  clearDemandErrors,
} from '../../redux/slices/demandSlice';

export default function DemandForecasting() {
  const dispatch = useDispatch();
  const {
    projections,
    emergingRoles,
    automationIndex,
    forecastHorizon,
    loading,
    error,
  } = useSelector((state) => state.demand);

  useEffect(() => {
    dispatch(fetchSkillForecast({ horizon: forecastHorizon }));
    dispatch(fetchEmergingRoles({ horizon: forecastHorizon }));
    dispatch(fetchAutomationAnalysis({ horizon: forecastHorizon }));
  }, [dispatch, forecastHorizon]);

  const handleHorizonChange = (e) => {
    dispatch(setForecastHorizon(e.target.value));
  };

  const handleRefresh = () => {
    dispatch(clearDemandErrors());
    dispatch(fetchSkillForecast({ horizon: forecastHorizon }));
    dispatch(fetchEmergingRoles({ horizon: forecastHorizon }));
    dispatch(fetchAutomationAnalysis({ horizon: forecastHorizon }));
  };

  return (
    <div>
      <header>
        <h1>Future-Ready Demand Forecasting</h1>
        <p>Predictive labor market analytics, multi-year skill projections, and automation risk analysis.</p>
      </header>

      {/* Horizon Controls */}
      <section style={{ marginTop: '1rem' }}>
        <div>
          <label htmlFor="horizon-select">Forecast Horizon: </label>
          <select
            id="horizon-select"
            value={forecastHorizon}
            onChange={handleHorizonChange}
          >
            <option value="1Y">1 Year Projection</option>
            <option value="3Y">3 Year Outlook</option>
            <option value="5Y">5 Year Horizon</option>
            <option value="10Y">10 Year Long-Range</option>
          </select>

          <button
            type="button"
            onClick={handleRefresh}
            style={{ marginLeft: '1rem' }}
          >
            Recalculate Projections
          </button>
        </div>
      </section>

      {/* Loading and Error Feedback */}
      {loading && <div style={{ marginTop: '1rem' }}>Running forecasting models and trend analysis...</div>}
      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <strong>Forecasting Error: </strong>
          <span>{error}</span>
          <button
            type="button"
            onClick={() => dispatch(clearDemandErrors())}
            style={{ marginLeft: '0.5rem' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Multi-Year Skill Demand Projections */}
      <section style={{ marginTop: '1.5rem' }}>
        <h2>Multi-Year Skill Demand Projections ({forecastHorizon})</h2>
        {projections && projections.length > 0 ? (
          <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Skill / Competency</th>
                <th>Domain / Category</th>
                <th>Current Demand</th>
                <th>Projected Demand</th>
                <th>Net Growth (%)</th>
                <th>Disruption Index</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((proj, idx) => (
                <tr key={proj.id || idx}>
                  <td><strong>{proj.skillName || proj.name}</strong></td>
                  <td>{proj.category || 'General'}</td>
                  <td>{proj.currentDemand}</td>
                  <td>{proj.projectedDemand}</td>
                  <td>{proj.netGrowth ? `${proj.netGrowth}%` : 'N/A'}</td>
                  <td>{proj.disruptionIndex || 'Medium'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No projection data available for the selected horizon.</p>
        )}
      </section>

      {/* Emerging Tech Job Roles */}
      <section style={{ marginTop: '2rem' }}>
        <h2>Emerging Technology Roles (Next {forecastHorizon})</h2>
        {emergingRoles && emergingRoles.length > 0 ? (
          <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Role Title</th>
                <th>Industry Sector</th>
                <th>Emergence Timeline</th>
                <th>Projected Growth (%)</th>
                <th>Prerequisite Skills</th>
              </tr>
            </thead>
            <tbody>
              {emergingRoles.map((role, idx) => (
                <tr key={role.id || idx}>
                  <td><strong>{role.title || role.roleName}</strong></td>
                  <td>{role.sector || role.industry}</td>
                  <td>{role.timeline || forecastHorizon}</td>
                  <td>{role.projectedGrowth ? `${role.projectedGrowth}%` : 'N/A'}</td>
                  <td>
                    {role.prerequisiteSkills ? (
                      Array.isArray(role.prerequisiteSkills)
                        ? role.prerequisiteSkills.join(', ')
                        : role.prerequisiteSkills
                    ) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No emerging roles loaded.</p>
        )}
      </section>

      {/* Automation Impact & Reskilling Indicators */}
      <section style={{ marginTop: '2rem' }}>
        <h2>Automation Impact & Workforce Adaptation Index</h2>
        {automationIndex && automationIndex.length > 0 ? (
          <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Job Role / Function</th>
                <th>Automation Exposure Score (%)</th>
                <th>Risk Classification</th>
                <th>Recommended Transition Skills</th>
                <th>Reskilling Priority</th>
              </tr>
            </thead>
            <tbody>
              {automationIndex.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td>{item.jobFunction || item.role}</td>
                  <td>{item.automationScore}%</td>
                  <td>{item.riskClassification || 'Moderate'}</td>
                  <td>
                    {item.transitionSkills ? (
                      Array.isArray(item.transitionSkills)
                        ? item.transitionSkills.join(', ')
                        : item.transitionSkills
                    ) : 'N/A'}
                  </td>
                  <td>{item.reskillingPriority || 'Standard'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No automation impact data currently loaded.</p>
        )}
      </section>
    </div>
  );
}
