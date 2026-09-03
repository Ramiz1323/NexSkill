import React from 'react';
import MarketIntelligence from './pages/marketIntelligence/MarketIntelligence';

export default function App() {
  return (
    <main>
      <MarketIntelligence />
    </main>
  );
}
import AppRoutes from './routes/AppRoutes';

function App() {
  return <AppRoutes />;
}

export default App;
